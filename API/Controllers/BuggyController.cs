using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    private readonly StoreContext _context;
    public BuggyController(StoreContext context)
    {
        _context = context;
    }

    [HttpGet("not-found")]
    public ActionResult GetNotFoundRequest()
    {
        var product = _context.Products.Find(999);

        if (product is null)
        {
            return NotFound(new ApiResponse(StatusCodes.Status404NotFound));
        }

        return Ok();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
        var product = _context.Products.Find(999);

        var productToReturn = product.ToString(); //will generate exception

        return Ok();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
        return BadRequest(new ApiResponse(StatusCodes.Status400BadRequest));
    }

    [HttpGet("bad-request/{id}")]
    public ActionResult GetBadRequest(int id)
    {
        return Ok();
    }
}
