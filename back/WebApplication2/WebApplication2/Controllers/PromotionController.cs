using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.models;


[Route("api/[controller]")]
[ApiController]
public class PromotionsController : ControllerBase
{
    private readonly MyDbContext _context;

    public PromotionsController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Promotion>>> GetPromotions()
    {
        return await _context.Promotions.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Promotion>> GetPromotion(int id)
    {
        var promotion = await _context.Promotions.FindAsync(id);
        if (promotion == null) return NotFound();
        return promotion;
    }

    [HttpPost]
    public async Task<ActionResult<Promotion>> PostPromotion(Promotion promotion)
    {
        _context.Promotions.Add(promotion);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPromotion), new { id = promotion.id }, promotion);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPromotion(int id, Promotion promotion)
    {
        if (id != promotion.id) return BadRequest();
        _context.Entry(promotion).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Promotions.Any(p => p.id == id))
                return NotFound();
            else throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePromotion(int id)
    {
        var promotion = await _context.Promotions.FindAsync(id);
        if (promotion == null) return NotFound();

        _context.Promotions.Remove(promotion);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
