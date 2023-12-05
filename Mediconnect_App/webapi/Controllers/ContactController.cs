using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Net;
using System.Reflection.Emit;
using System.Reflection;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<ContactController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public ContactController(ILogger<ContactController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP POST method to save contact information
        [HttpPost(Name = "Save contact")]
        public IActionResult SaveContact(ContactUs feedback)
        {
            try
            {
                // Create a new SqlConnection using the configured connection string
                SqlConnection con = new SqlConnection(_config);
                con.Open(); // Open the database connection

                // Create a new SqlCommand to execute the SQL INSERT query
                SqlCommand cmd = new SqlCommand("INSERT INTO Contact(UserId, Name, Email, Message, CreatedDate) " +
                    "Values('" + feedback.UserId + "','" + feedback.Name + "','" + feedback.Email + "','" + feedback.Message + "','" + DateTime.Now + "')", con);

                // Execute the query
                cmd.ExecuteNonQuery();

                // Close the database connection
                con.Close();
            }
            catch (Exception ex)
            {
                // Return a Bad Request response if an exception occurs
                return BadRequest(ex.Message);
            }

            // Return a successful response if the operation is successful
            return Ok(new SuccessRes { Success = true, Message = "Feedback updated successfully." });
        }
    }
}
