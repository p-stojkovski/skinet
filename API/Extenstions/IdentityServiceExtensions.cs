using System.Text;
using Ardalis.GuardClauses;
using Core.Entities.Identity;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace API.Extenstions;

public static class IdentityServiceExtensions
{
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {

        var connectionString = config.GetConnectionString("IdentityConnection");

        Guard.Against.Null(connectionString, message: "Connection string 'IdentityConnection' not found.");

        services.AddDbContext<AppIdentityDbContext>((sp, options) =>
        {
            //options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());
            options.UseSqlServer(connectionString);

        });

        services.AddIdentityCore<AppUser>(opt =>
        {
            // add identity options here
        })
        .AddEntityFrameworkStores<AppIdentityDbContext>()
        .AddSignInManager<SignInManager<AppUser>>();

        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                    ValidIssuer = config["Token:Issuer"],
                    ValidateIssuer = true,
                    ValidateAudience = false
                };
            });

        services.AddAuthorization();

        return services;
    }
}