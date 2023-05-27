using LearnMaster.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

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
            return View();
        }

        public IActionResult Registration(string name, string password, string role)
        {
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                User u = new User() { Name = name, Password = password, Role = role };
                db.Users.Add(u);
                db.SaveChanges();
            }
            return View("LogIn");
        }

        public IActionResult Auth(string password)
        {
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                User user = db.Users.Where(u => u.Password == password).ToList()[0];
                if (user.Role == "Student")
                {
                    return View("StudentHomePage");
                }
                else if(user.Role=="Teacher")
                {
                    return View("TeacherHomePage");
                }

                return Content("Not fount");

            }
        }

        public IActionResult LogIn ()
        {
            return View("LogIn");
        }

    }
}