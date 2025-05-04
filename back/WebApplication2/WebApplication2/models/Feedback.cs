using System.ComponentModel.DataAnnotations;

namespace WebApplication2.models
{
    public class Feedback
    {
        public int id { get; set; }
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string message { get; set; }
        public DateTime submitted_at { get; set; }
    }


}
