using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;

[Route("api/[controller]")]
[ApiController]
public class SessionsController : ControllerBase
{
    private readonly MyDbContext _context;

    public SessionsController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WebApplication2.models.Session>>> GetSessions()
    {
        return await _context.Sessions.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<WebApplication2.models.Session>> GetSession(int id)
    {
        var session = await _context.Sessions.FindAsync(id);
        if (session == null) return NotFound();
        return session;
    }

    [HttpPost]
    public async Task<ActionResult<WebApplication2.models.Session>> PostSession(WebApplication2.models.Session session)
    {
        _context.Sessions.Add(session);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetSession), new { id = session.id }, session);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutSession(int id, WebApplication2.models.Session session)
    {
        if (id != session.id) return BadRequest();
        _context.Entry(session).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Sessions.Any(s => s.id == id))
                return NotFound();
            else throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSession(int id)
    {
        var session = await _context.Sessions.FindAsync(id);
        if (session == null) return NotFound();

        _context.Sessions.Remove(session);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
