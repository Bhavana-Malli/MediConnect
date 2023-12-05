namespace webapi
{
    public class RecipientDetails
    {
        public int? recipientid { get; set; }
        public int? userid { get; set; }
        public int[]? organsinfo { get; set; }
        public List<Organ>? organsList { get; set; }
        public int? organ { get; set; }
        public string? bloodtype { get; set; }
        public string? age { get; set; }
        public string? name { get; set; }
        public string? relationship { get; set; }
        public string? contact { get; set; }
        public string? address { get; set; }
        public string? createddate { get; set; }
        public bool? isReceived { get; set; }
        public string? organName { get; set; }
        public string? details { get; set; }
    }

    public class RecipientData
    {
        public RecipientDetails recipients { get; set; }
        public List<int> organs { get; set; }
    }


    public class UpdateRecipient
    {
        public int recipientId { get; set; }
        public int organId { get; set; }
        public int? userId { get; set; }
        public bool IsReceived { get; set; }
        public string? details { get; set; }

    }

}
