using System.ComponentModel.DataAnnotations;

namespace WebApplication2.models
{
    public class Review
    {
        public int id { get; set; }
        public int User_id { get; set; }
        public int Movie_id { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime created_at { get; set; }
    }

}
