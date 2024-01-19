using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extenstions;

public static class UserManagerExtensions
{
    public static async Task<AppUser> FindByEmailFromClaimsPrincipal(this UserManager<AppUser> userManager,
    ClaimsPrincipal user, bool includeAddress = false)
    {
        var query = userManager.Users;

        if (includeAddress)
        {
            query = query.Include(x => x.Address);
        }

        return await query.SingleOrDefaultAsync(x => x.Email == user.FindFirstValue(ClaimTypes.Email));
    }
}