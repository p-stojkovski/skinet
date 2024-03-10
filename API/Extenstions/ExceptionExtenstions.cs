using API.Errors;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Extenstions;

public static class ExceptionExtensions
{
    public static BadRequestObjectResult ToBadRequest(this Exception exception, string defaultMessage = "An error occurred")
    {
        if (exception is ValidationException vex)
        {
            return new BadRequestObjectResult(new ApiResponse(StatusCodes.Status400BadRequest, vex.Errors));
        }
        else
        {
            return new BadRequestObjectResult(new ApiResponse(StatusCodes.Status400BadRequest, defaultMessage));
        }
    }
}