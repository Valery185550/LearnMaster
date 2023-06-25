using LearnMaster.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace LearnMaster.Controllers
{ 

    public class HomeController : Controller
    {
        private readonly IConfiguration Configuration;

        public HomeController(IConfiguration configuration)
        {
            this.Configuration = configuration;
        }

        public IActionResult Index()
        {
            return Content("Server is started");
        }

        [HttpPost]
        public IActionResult Registration([FromBody] UserModel u)
        {
            if (getUser(u.Password) != null)
            {
                
                return Content("0");
            }
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                User newU = new User() { Name = u.Name, Password = u.Password, Role = u.Role };
                db.Users.Add(newU);
                db.SaveChanges();
            }
            return Content("1");
        }

        public string Auth(string password)
        {

            User user = getUser(password);
            if (user != null)
            {
                var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Name) };
                var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        claims: claims,
                        expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)), // время действия 2 минуты
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

                return new JwtSecurityTokenHandler().WriteToken(jwt);
            }
            else return "Not found";
        }

        private User getUser(string password)
        {
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                List<User> users = db.Users.Where(u => u.Password == password).ToList();


                if (users.Count == 0)
                {
                    return null;
                }
                else return users[0];


            }
        }

        [Authorize]
        public string Hello()
        {
            return "Hello";
        }

    }
}