
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();

builder.Services.AddAuthentication("token")
                .AddJwtBearer("token", options =>
                {
                    options.Authority = "https://localhost:5001";
                    options.TokenValidationParameters.ValidateAudience = false;
                    options.TokenValidationParameters.ValidTypes = new[] { "at+jwt" };
                });

builder.Services.AddAuthorization(options =>
    options.AddPolicy("ApiScope", policy =>
    {
        policy.RequireAuthenticatedUser();
        policy.RequireClaim("scope", "api1");
    })
);

builder.Services.AddCors(options =>
{
    // this defines a CORS policy called "default"
    options.AddPolicy("default", policy =>
    {
        policy.WithOrigins("https://localhost:5003").AllowAnyHeader().AllowAnyMethod();
    });
});

string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<LearnMasterContext>(options => options.UseSqlite(connection));

builder.Services.AddSignalR();

var app = builder.Build();


app.UseHttpsRedirection();

app.UseCors("default");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers().RequireAuthorization("ApiScope");


app.Run();
