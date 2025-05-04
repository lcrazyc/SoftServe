using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

[Route("api/[controller]")]
[ApiController]
public class FavoritesController : ControllerBase
{
    private readonly MyDbContext _context;

    public FavoritesController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Favorite>>> GetFavorites()
    {
        return await _context.Favorites.ToListAsync();
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<Favorite>>> GetFavoritesByUser(int userId)
    {
        return await _context.Favorites.Where(f => f.user_id == userId).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Favorite>> PostFavorite(Favorite favorite)
    {
        _context.Favorites.Add(favorite);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetFavorites), new { id = favorite.id }, favorite);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFavorite(int id)
    {
        var favorite = await _context.Favorites.FindAsync(id);
        if (favorite == null) return NotFound();

        _context.Favorites.Remove(favorite);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

