
using FluentValidation.Results;

namespace API.Errors;

public class ApiResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public IReadOnlyList<string> Errors { get; set; }
    //public Dictionary<string, string[]> Errors { get; set; }

    public ApiResponse(int statusCode, string message = null)
    {
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
    }

    public ApiResponse(int statusCode, IEnumerable<ValidationFailure> errors)
    {
        StatusCode = statusCode;
        Errors = errors
            .Distinct()
            .Select(e => e.ErrorMessage)
            .ToList();
        //Errors = errors
        //    .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
        //    .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
        Message = "One or more validation errors occurred. See the 'Errors' property for details.";
    }

    private string GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "A bad request, you have made",
            401 => "Authorized, you are not",
            404 => "Resource found, it was not",
            500 => "Errors are the patch of the dark side. Errors lead to anher. Anger leads to hate, Hate leads to carrer change",
            _ => null
        };
    }
}
