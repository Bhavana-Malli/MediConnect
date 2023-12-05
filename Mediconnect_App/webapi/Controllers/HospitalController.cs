using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace webapi.Controllers
{
    // Declare the controller and define its route
    [ApiController]
    [Route("[controller]")]
    public class HospitalController : ControllerBase
    {
        // Logger and Configuration fields for dependency injection
        private readonly ILogger<HospitalController> _logger;
        private readonly IConfiguration _configuration;
        private string _config; // Connection string

        // Constructor to initialize the controller with dependencies
        public HospitalController(ILogger<HospitalController> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _config = _configuration.GetConnectionString("DefaultConnection");
        }

        // HTTP GET method to retrieve hospital details
        [HttpGet(Name = "GetHospitalDetails")]
        public IEnumerable<Hospital> Get()
        {
            SqlDataReader reader = null;
            SqlConnection myConnection = new SqlConnection(_config);

            // Setup SQL command to select data from the Hospital table
            SqlCommand sqlCmd = new SqlCommand();
            sqlCmd.CommandType = CommandType.Text;
            sqlCmd.CommandText = "Select * from Hospital";
            sqlCmd.Connection = myConnection;
            myConnection.Open();
            reader = sqlCmd.ExecuteReader();

            // Process and populate hospital details
            List<Hospital> hospitalList = new List<Hospital>();
            while (reader.Read())
            {
                Hospital hospital = new Hospital();
                // Populate hospital details
                hospital.Name = reader.GetValue(1).ToString();
                hospital.Address = reader.GetValue(2).ToString();
                hospital.GoogleMapLink = reader.GetValue(3).ToString();
                hospital.DistanceInKm = (int)reader.GetValue(4);
                hospitalList.Add(hospital);
            }
            myConnection.Close();

            // Return the list of hospital details
            return hospitalList;
        }
    }
}
