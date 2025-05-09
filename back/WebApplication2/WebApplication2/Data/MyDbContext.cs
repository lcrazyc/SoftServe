using Microsoft.EntityFrameworkCore;
using WebApplication2.models;
using WebApplication2.Models;
using WebCinema.Models;


namespace WebApplication2.Data
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Promotion> Promotions { get; set; }
        public DbSet<WebApplication2.models.Session> Sessions { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Payment> Payments { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Favorite>().ToTable("favorites");
            modelBuilder.Entity<Review>().ToTable("reviews");
            modelBuilder.Entity<Promotion>().ToTable("promotions");
            modelBuilder.Entity<Feedback>().ToTable("feedback");
            modelBuilder.Entity<Movie>().ToTable("movies");
            modelBuilder.Entity<User>().ToTable("users");
            modelBuilder.Entity<WebApplication2.models.Session>().ToTable("sessions");
        }
    }
}
