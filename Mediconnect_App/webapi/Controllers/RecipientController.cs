using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [ApiController]
    [Route("[controller]")]
    public class RecipientController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<RecipientController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public RecipientController(ILogger<RecipientController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP GET method to retrieve recipient details
        [HttpGet(Name = "GetRecipientDetails")]
        public IActionResult Get(int userId)
        {
            try
            {
                // Database connection and SQL command setup
                SqlDataReader reader = null;
                SqlConnection myConnection = new SqlConnection(_config);
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.Text;
                sqlCmd.CommandText = "Select * from RecipientData LEFT JOIN UserOrganReceiverMap on UserOrganReceiverMap.RecipientId = RecipientData.RecipientId LEFT JOIN Organ ON UserOrganReceiverMap.OrganId = Organ.Id" + (userId == 0 ? "" : " where UserId = " + userId);
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                reader = sqlCmd.ExecuteReader();

                // Lists to store recipient details and organ information
                List<RecipientDetails> recipientList = new List<RecipientDetails>();
                List<RecipientDetails> mergedList = new List<RecipientDetails>();

                // Populate recipientList with retrieved recipient details
                while (reader.Read())
                {
                    RecipientDetails recipient = new RecipientDetails();
                    recipient.recipientid = (int)reader.GetValue(0);
                    // Populate other recipient details...
                    recipientList.Add(recipient);
                }

                // Merge recipientList based on recipientid and organ information
                foreach (var rec in recipientList.OrderBy(x => x.recipientid))
                {
                    var i = mergedList.FindIndex(x => x.recipientid == rec.recipientid);
                    if (i > -1)
                    {
                        var j = mergedList[i].organsList.FindIndex(x => x.Id == rec.organ);
                        if (j == -1)
                        {
                            mergedList[i].organsList.Add(new Organ
                            {
                                Id = rec.organ ?? 0,
                                Name = rec.organName,
                                IsReceived = rec.isReceived
                            });
                        }
                    }
                    else
                    {
                        rec.organsList = new List<Organ> { new Organ
                        {
                            Id = rec.organ ?? 0,
                            Name = rec.organName,
                            IsReceived = rec.isReceived
                        } };
                        mergedList.Add(rec);
                    }
                }

                // Close the database connection
                myConnection.Close();

                // Return the merged recipientList with organ information
                return Ok(mergedList);
            }
            catch (Exception ex)
            {
                // Return a Bad Request response if an exception occurs
                return BadRequest(ex.Message);
            }
        }

        // HTTP POST method to create a new recipient
        [HttpPost("PostRecDetails")]
        public IActionResult CreateRecipient(RecipientDetails rec)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();

                // Execute SQL query to insert new recipient details
                SqlCommand cmd = new SqlCommand("INSERT INTO RecipientData(OrgansInfo,BloodType,Age,Name,Relationship,Contact,Address,CreatedDate) "
                                 + "OUTPUT INSERTED.RecipientID " + "Values('" + "" + "','" + rec.bloodtype + "','" + rec.age + "','" + rec.name + "','" + rec.relationship + "','" + rec.contact + "','" + rec.address + "','" + DateTime.Now + "')", con);
                var insertedId = cmd.ExecuteScalar();

                // If the insertion is successful, update the organ information in UserOrganReceiverMap
                if (insertedId != null)
                {
                    int newId = Convert.ToInt32(insertedId);
                    foreach (int organ_id in rec.organsinfo)
                    {
                        SqlCommand cmdMap = new SqlCommand("INSERT INTO UserOrganReceiverMap(UserId, OrganId, RecipientId, IsReceived)" + "Values('" + rec.userid + "','" + organ_id + "','" + newId + "','" + 0 + "')", con);

                        cmdMap.ExecuteNonQuery();
                    }
                }

                // Close the database connection
                con.Close();
            }
            catch (Exception ex)
            {
                // Handle exceptions (empty in the provided code)
            }

            // Return a success response
            return Ok(new SuccessRes { Success = true, Message = "Recipient updated successfully." });
        }

        // HTTP POST method to update recipient details
        [HttpPost("UpdateRecipient")]
        public IActionResult UpdateRecipient(UpdateRecipient payload)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();
                SqlCommand cmd = new SqlCommand($"UPDATE UserOrganReceiverMap SET IsReceived = {(payload.IsReceived ? 1 : 0)}, Details = '{payload.details}' WHERE OrganId = {payload.organId} AND RecipientId = {payload.recipientId}", con);
                var affectedRows = cmd.ExecuteNonQuery();

                // Close the database connection
                con.Close();

                // Return the number of affected rows
                return Ok(affectedRows);
            }
            catch (Exception ex)
            {
                // Return a Bad Request response if an exception occurs
                return BadRequest(ex.Message);
            }
        }
    }
}
