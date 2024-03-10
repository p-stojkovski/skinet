using System;
using System.Net;
using System.Text.Json;
using API.Errors;
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

            switch (ex)
            {
                case ArgumentNullException argNullEx:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    message = $"Argument '{argNullEx.ParamName}' cannot be null";
                    break;
                case ArgumentException argEx:
                    statusCode = (int)HttpStatusCode.BadRequest;
                    message = argEx.Message;
                    break;
                default:
                    statusCode = (int)HttpStatusCode.InternalServerError;
                    message = "An unexpected error occurred";
                    break;
            }

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = statusCode;

            var response = _env.IsDevelopment()
                ? new ApiException((int)statusCode, message, ex.StackTrace.ToString())
                : new ApiException((int)statusCode);

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}
