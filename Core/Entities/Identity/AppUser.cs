using System.Net.Sockets;
using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity;

public class AppUser : IdentityUser
{
    public string DIsplayName { get; set; }
    public Address Address { get; set; }
}
