namespace WebApplication2.models
{
    public class Session
    {
        public int id { get; set; }
        public int Movie_id { get; set; }
        public int Hall_id { get; set; }
        public DateTime Session_time { get; set; }
        public decimal Price { get; set; }
    }

}
