using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Models
{
    public class User
    {
        [Key]
        public int id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Username { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password_hash { get; set; }

        [MaxLength(100)]
        public string? Email { get; set; }

        [Required]
        [Column(TypeName = "enum('user','admin')")]
        public string Role { get; set; } = "user";

        public DateTime Created_at { get; set; } = DateTime.Now;
    }
}
