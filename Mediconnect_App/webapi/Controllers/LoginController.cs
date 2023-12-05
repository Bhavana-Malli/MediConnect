using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<LoginController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public LoginController(ILogger<LoginController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP POST method to validate user login details
        [HttpPost(Name = "ValidateUserDetails")]
        public IActionResult ValidateUser(Register reg)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();

                // Execute SQL query to validate user details
                SqlCommand cmd = new SqlCommand("select top 1 * from UserRegistration where Email='" + reg.email + "' and Password='" + reg.password + "'", con);
                SqlDataReader reader = cmd.ExecuteReader();

                // Populate user details if the login is successful
                while (reader.Read())
                {
                    reg.regid = reader.GetValue(0).ToString();
                    reg.role = (int)reader.GetValue(1);
                    // Populate other user details...
                }

                // If the regid is not populated, set reg to a new Register object
                if (reg.regid == "")
                {
                    reg = new Register();
                }

                // Close the database connection
                con.Close();
            }
            catch (Exception ex)
            {
                // Handle exceptions 
            }

            // Return the result of the login validation
            return Ok(reg);
        }
    }
}
