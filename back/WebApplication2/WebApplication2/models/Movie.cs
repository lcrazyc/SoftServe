using System.ComponentModel.DataAnnotations;

namespace WebCinema.Models
{
    public class Movie
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Genres { get; set; }
        public decimal Rating { get; set; }
        public int release_year { get; set; }
        public string poster_url { get; set; }
        public string trailer_url { get; set; }
        public int duration_minutes { get; set; }
        public DateTime created_at { get; set; } = DateTime.Now;
    }
}
