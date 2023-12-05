// Import necessary namespaces for the controller
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using webapi;

// Define the controller and set its route
[ApiController]
[Route("[controller]")]
public class OrganController : ControllerBase
{
    // Logger instance for logging purposes
    private readonly ILogger<OrganController> _logger;

    // Configuration instance for accessing configuration settings
    private readonly IConfiguration _configuration;

    // Connection string for the database
    private string _config;

    // Constructor to initialize the controller with a logger and configuration
    public OrganController(ILogger<OrganController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;

        // Get the connection string from the configuration
        _config = _configuration.GetConnectionString("DefaultConnection");
    }

    // HTTP GET method to retrieve organ and medical information
    [HttpGet(Name = "Get organ list")]
    public IActionResult Get()
    {
        // Lists to store organ and medical information
        List<Organ> dataList = new List<Organ>();
        List<Organ> medDataList = new List<Organ>();

        try
        {
            // Establish a connection to the database
            SqlConnection con = new SqlConnection(_config);
            con.Open();

            // Query to select all records from the Organ table
            SqlCommand cmd = new SqlCommand("select * from Organ", con);
            SqlDataReader reader = cmd.ExecuteReader();

            // Read organ records and populate the dataList
            while (reader.Read())
            {
                Organ dataObject = new Organ
                {
                    Id = (int)reader[0],
                    Name = reader[1].ToString(),
                    Createddate = reader[2].ToString(),
                };

                dataList.Add(dataObject);
            }
            con.Close();

            // Open a new connection to query the MedicalInfo table
            con.Open();
            SqlCommand medCmd = new SqlCommand("select * from MedicalInfo", con);
            SqlDataReader medReader = medCmd.ExecuteReader();

            // Read medical information records and populate the medDataList
            while (medReader.Read())
            {
                Organ dataObject1 = new Organ
                {
                    Id = (int)medReader[0],
                    Name = medReader[1].ToString(),
                    Createddate = medReader[2].ToString(),
                };

                medDataList.Add(dataObject1);
            }

            con.Close();
        }
        catch (Exception ex)
        {
            // Return a BadRequest response if an exception occurs
            return BadRequest(ex.Message);
        }

        // Return a successful response with the organ and medical information lists
        return Ok(new { status = new SuccessRes { Success = true, Message = "Donor updated successfully." }, OrganList = dataList, MedInfo = medDataList });
    }
}
