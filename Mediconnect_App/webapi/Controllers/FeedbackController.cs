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
    public class FeedbackController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<FeedbackController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public FeedbackController(ILogger<FeedbackController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP POST method to save user feedback
        [HttpPost(Name = "Save feedback")]
        public IActionResult SaveFeedback(FeedbackReq feedback)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();

                // Insert feedback into the Feedback table
                SqlCommand cmd = new SqlCommand("INSERT INTO Feedback(UserId, Ratings, Feedback, CreatedDate) " +
                    "Values('" + feedback.UserId + "','" + feedback.Rating + "','" + feedback.Feedback + "','" + DateTime.Now + "')", con);
                cmd.ExecuteNonQuery();

                // Close the database connection
                con.Close();
            }
            catch (Exception ex)
            {
                // Return a Bad Request response if an exception occurs
                return BadRequest(ex.Message);
            }

            // Return a successful response
            return Ok(new SuccessRes { Success = true, Message = "Feedback updated successfully." });
        }
    }
}
