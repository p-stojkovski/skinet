using System;
using System.Net;
using System.Text.Json;
using API.Errors;
using Core.Exceptions;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Options;

namespace API.Middleware;

public sealed class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _env = env;
        _logger = logger;
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);

            int statusCode;
            string message;
            IEnumerable<ValidationFailure> errors = new List<ValidationFailure>();

            switch (ex)
            {
                case ArgumentException argumentException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    message = argumentException.Message;
                    break;
                case ValidationException validationException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    errors = validationException.Errors;
                    message = validationException.Message;
                    break;
                case DomainException domainException:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    message = domainException.Message;
                    break;
                default:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    message = "An unexpected error occurred";
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            var response = errors.Any() 
                ? new ApiResponse((int)statusCode, errors) 
                : new ApiResponse((int)statusCode, message);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}
