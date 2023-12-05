namespace webapi
{
    public class DonorDetails
    {
        public int userid { get; set; }
        public string? donorid { get; set; }
        public int[] medinfo { get; set; }
        public string? name { get; set; }
        public string? relationship { get; set; }
        public string? contact { get; set; }
        public string? address { get; set; }
        public string? sign { get; set; }
        public string? createddate { get; set; }
        public DonatedOrgan? organs { get; set; }
    }


    public class DonatedOrgan
    {
        public int[] organsData { get; set; }


    }
    public class Organ
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Createddate { get; set; }
        public bool? IsReceived { get; set; }
        public bool? IsDonated { get; set; }


    }
}
