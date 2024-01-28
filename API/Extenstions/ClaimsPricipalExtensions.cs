using System.Security.Claims;

namespace API.Extenstions;
public static class ClaimsPricipalExtensions
{
    public static string RetriveEmailFromPrincipal(this ClaimsPrincipal user)
    {
        return user.FindFirstValue(ClaimTypes.Email);
    }
}