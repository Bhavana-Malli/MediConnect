using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;
using System.Net;
using System.Security.Cryptography.Xml;
using System.Text;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [ApiController]
    [Route("[controller]")]
    public class DonorController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<DonorController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public DonorController(ILogger<DonorController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP POST method to create a new donor and associated details
        [HttpPost(Name = "PostDonorDetails")]
        public IActionResult CreateDonor(DonorDetails don)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();

                // Insert donor details into the DonorData table and retrieve the inserted DonorID
                SqlCommand cmd = new SqlCommand("INSERT INTO DonorData(Organs,MedInfo,Name,Relationship,Contact,Address,Sign,CreatedDate) "
                    + "OUTPUT INSERTED.DonorID "
                    + "Values('" + "" + "','" + don.medinfo + "','" + don.name + "','" + don.relationship + "','" + don.contact + "','" + don.address + "','" + don.sign + "','" + DateTime.Now + "')", con);
                var insertedId = cmd.ExecuteScalar();

                if (insertedId != null)
                {
                    // Convert the insertedId to an integer
                    int newId = Convert.ToInt32(insertedId);

                    // Insert organ mappings into the UserOrganMap table
                    foreach (int organ_id in don.organs.organsData)
                    {
                        SqlCommand cmdMap = new SqlCommand("INSERT INTO UserOrganMap(UserId, OrganId, DonorId, IsDonated)" + "Values('" + don.userid + "','" + organ_id + "','" + newId + "','" + 0 + "')", con);
                        cmdMap.ExecuteNonQuery();
                    }

                    // Insert medical mappings into the UserMedicalMap table
                    foreach (int med in don.medinfo)
                    {
                        SqlCommand cmdMed = new SqlCommand("INSERT INTO UserMedicalMap(UserId, MedId, DonorId)" + "Values('" + don.userid + "','" + med + "','" + newId + "')", con);
                        cmdMed.ExecuteNonQuery();
                    }
                }

                // Close the database connection
                con.Close();
            }
            catch (Exception ex)
            {
                // Handle exceptions 
            }

            // Return a successful response
            return Ok(new SuccessRes { Success = true, Message = "Donor updated successfully." });
        }
    }
}
