using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebCinema.Models;

namespace WebApplication2.Models
{
    public class Favorite
    {
        [Key]
        public int id { get; set; }

        [Required]
        public int user_id { get; set; }

        [Required]
        public int movie_id { get; set; }

        public DateTime created_at { get; set; } = DateTime.Now;

        // Навігаційні властивості
        [ForeignKey("user_id")]
        public User Users { get; set; }

        [ForeignKey("movie_id")]
        public Movie Movies { get; set; }
    }
}
