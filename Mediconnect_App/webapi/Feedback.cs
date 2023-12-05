using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace webapi
{
    public class FeedbackReq
    {
        public int UserId { get; set; }
        [JsonIgnore]
        [ForeignKey("RegID")]
        public virtual Register? Register { get; set; }
        public int Rating { get; set; }
        public string Feedback { get; set; } = string.Empty;
    }
}
