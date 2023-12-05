using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<HomeController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP GET method to retrieve donation details
        [HttpGet(Name = "GetDonationDetails")]
        public IEnumerable<DonationDetails> Get()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection(_config);

            // Setup SQL command to select data from the DonorData table
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from DonorData";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            // Process and populate donation details
            List<DonationDetails> donList = new List<DonationDetails>();
            while (reader.Read())
            {
                DonationDetails don = new DonationDetails();
                // Populate donation details
                don.donorid = (int)reader.GetValue(0);
                don.organs = new List<Organ> { };
                don.medinfo = reader.GetValue(2).ToString();
                don.name = reader.GetValue(3).ToString();
                don.relationship = reader.GetValue(4).ToString();
                don.contact = reader.GetValue(5).ToString();
                don.address = reader.GetValue(6).ToString();
                don.sign = reader.GetValue(7).ToString();
                don.createddate = reader.GetValue(8).ToString();
                donList.Add(don);
            }
            myConnection.Close();

            // Return the list of donation details
            return donList;
        }

        // HTTP POST method to create a new user registration
        [HttpPost(Name = "PostRegDetails")]
        public IActionResult CreateUser(Register reg)
        {
            try
            {
                // Database connection and SQL command setup
                SqlConnection con = new SqlConnection(_config);
                con.Open();

                // Insert user registration details into the UserRegistration table
                SqlCommand cmd = new SqlCommand("INSERT INTO UserRegistration(Role, Firstname,Lastname,Gender,DOB,BloodGroup,Email,Address,City,State,Zipcode,Username,Password,ConfirmPassword,CreatedDate) " +
                    "Values('" + 0 + "','" + reg.firstname + "','" + reg.lastname + "','" + reg.gender + "','" + DateTime.Now + "','" + reg.bloodgroup + "','" + reg.email + "','" + reg.address + "','" + reg.city + "','" + reg.state + "','" + reg.zipcode + "','" + reg.email + "','" + reg.password + "','" + reg.confirmpassword + "','" + DateTime.Now + "')", con);
                cmd.ExecuteNonQuery();

                // Close the database connection
                con.Close();
            }
            catch (Exception ex)
            {
                // Handle exceptions
            }

            // Return a successful response
            return Ok(reg);
        }
    }
}
