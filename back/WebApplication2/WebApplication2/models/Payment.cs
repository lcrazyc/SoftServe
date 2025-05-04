namespace WebApplication2.models
{
    public class Payment
    {
        public int id { get; set; }
        public int ticket_id { get; set; }
        public decimal Amount { get; set; }
        public DateTime payment_time { get; set; }
        public string payment_method { get; set; }
    }
}
