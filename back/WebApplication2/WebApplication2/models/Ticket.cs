namespace WebApplication2.models
{
    public class Ticket
    {
        public int id { get; set; }
        public int Session_id { get; set; }
        public int User_id { get; set; }
        public string Seat_number { get; set; }
        public string Status { get; set; }
        public DateTime Purchased_at { get; set; }
    }
}
