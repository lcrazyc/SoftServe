using System.ComponentModel.DataAnnotations;

namespace WebApplication2.models
{
    public class Promotion
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Code_url { get; set; }
        public DateTime Start_date { get; set; }
        public DateTime End_date { get; set; }
    }

}
