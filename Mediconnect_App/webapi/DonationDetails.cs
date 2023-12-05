using System.Net;
using System.Security.Cryptography.Xml;

namespace webapi
{
    public class DonationDetails
    {

        public int? donorid { get; set; }
        public List<Organ>? organs { get; set; }
        public List<Organ>? medInfos { get; set; }
        public string? medinfo { get; set; }
        public string? name { get; set; }
        public string? relationship { get; set; }
        public string? contact { get; set; }
        public string? address { get; set; }
        public string? sign { get; set; }
        public string? createddate { get; set; }
        public string? organName { get; set; }
        public int organ { get; set; }
        public int medId { get; set; }
        public string? med { get; set; }
        public string? details { get; set; }
        public bool? isDontated { get; set; }

    }

    public class UpdateDonation
    {
        public int donorId { get; set; }
        public int organId { get; set; }
        public int? userId { get; set; }
        public string? details { get; set; }
        public bool donation { get; set; }
    }
}
