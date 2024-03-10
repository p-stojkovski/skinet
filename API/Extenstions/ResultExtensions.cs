using API.Errors;
using FluentValidation;
using LanguageExt.Common;
using Microsoft.AspNetCore.Mvc;

namespace API.Extenstions;

public static class ResultExtensions
{
    public static ActionResult ToActionResult<T>(this Result<T> result)
    {
        return result.Match<ActionResult>(
            s => new OkObjectResult(s),
            err =>
            {
                if (err is ValidationException vex)
                {
                    return new BadRequestObjectResult(new ApiResponse(StatusCodes.Status400BadRequest, vex.Errors));
                }
                else
                {
                    return new BadRequestObjectResult(new ApiResponse(StatusCodes.Status400BadRequest, err.Message));
                }
            });
    }
}
