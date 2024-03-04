namespace API.Dtos;
public sealed record LoginDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}