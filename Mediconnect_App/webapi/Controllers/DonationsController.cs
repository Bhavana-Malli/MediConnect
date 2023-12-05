using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [ApiController]
    [Route("[controller]")]
    public class DonationsController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<DonationsController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public DonationsController(ILogger<DonationsController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP GET method to retrieve donation details based on userId
        [HttpGet]
        public IActionResult GetDonations(int userId)
        {
            try
            {
                // Database connection and SQL command setup
                SqlDataReader reader = null;
                SqlConnection myConnection = new SqlConnection(_config);
                SqlCommand sqlCmd = new SqlCommand();
                sqlCmd.CommandType = CommandType.Text;
                sqlCmd.CommandText = "Select * from DonorData LEFT JOIN UserOrganMap on UserOrganMap.DonorId = DonorData.DonorID LEFT JOIN Organ ON UserOrganMap.OrganId = Organ.Id LEFT JOIN UserMedicalMap ON UserMedicalMap.DonorId = DonorData.DonorID LEFT JOIN MedicalInfo ON UserMedicalMap.MedId = MedicalInfo.Id" + (userId == 0 ? "" : " where UserOrganMap.UserId= " + userId);
                sqlCmd.Connection = myConnection;
                myConnection.Open();
                reader = sqlCmd.ExecuteReader();

                // Process and consolidate donation details
                List<DonationDetails> donList = new List<DonationDetails>();
                while (reader.Read())
                {
                    // Populate donation details
                    DonationDetails don = new DonationDetails();
                    //... (populate the object properties)

                    // Add the donation details to the list
                    donList.Add(don);
                }

                // Merge donation details based on donorid
                var mergeList = new List<DonationDetails>();
                foreach (var rec in donList.OrderBy(x => x.donorid))
                {
                    //... (merge the donation details)
                }

                // Return the merged donation details
                return Ok(mergeList);
            }
            catch (Exception ex)
            {
                // Return a Bad Request response if an exception occurs
                return BadRequest(ex.Message);
            }
        }

        // HTTP POST method to update donation information
        [HttpPost("UpdateDonation")]
        public IActionResult UpdateDonation(UpdateDonation payoad)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();
                SqlCommand cmd = new SqlCommand($"UPDATE UserOrganMap SET IsDonated = {(payoad.donation ? 1 : 0)}{(payoad.details.Count() == 0 ? "" : ", Details = '" + payoad.details + "'")} WHERE OrganId = {payoad.organId} AND DonorId = {payoad.donorId}", con);

                // Execute the update query
                var insertedId = cmd.ExecuteNonQuery();

                // Close the database connection
                con.Close();

                // Return the result of the update operation
                return Ok(insertedId);
            }
            catch (Exception ex)
            {
                // Return a Bad Request response if an exception occurs
                return BadRequest(ex.Message);
            }
        }
    }
}
