// Import necessary namespaces for the controller
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using webapi;

// Define the controller and set its route
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    // Array of weather summaries
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    // Logger instance for logging purposes
    private readonly ILogger<WeatherForecastController> _logger;

    // Constructor to initialize the controller with a logger
    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    // HTTP GET method to retrieve weather forecasts
    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        // Generate and return an array of weather forecasts
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            // Generate dates for the next 5 days
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),

            // Generate random temperature values between -20 and 55 degrees Celsius
            TemperatureC = Random.Shared.Next(-20, 55),

            // Select a random weather summary from the predefined array
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
