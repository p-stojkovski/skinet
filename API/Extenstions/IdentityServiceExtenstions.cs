using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extenstions;

public static class IdentityServiceExtenstions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config) 
    {
        services.AddDbContext<AppIdentityDbContext>(opt => 
        {
            opt.UseSqlite(config.GetConnectionString("IdentityConnection"));
        });

        return services;
    }
}