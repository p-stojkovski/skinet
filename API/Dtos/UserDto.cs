namespace API.Dtos;
public sealed record UserDto
{
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public string Token { get; set; }
}