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

        
       

        /*[HttpPost]
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

        private User getUser(string password)
        {
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                List<User> users = db.Users.Where(u => u.Password == password).ToList();


                if (users.Count == 0)
                {
                    return null;
                }
                else
                {
                    return users[0];
                }


            }
        }

        [Authorize]

        public IActionResult Courses()
        {
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                string userPassword = HttpContext.User.FindFirst("Password").Value;
                
                User user = db.Users.Include(u => u.UsersCourses).ThenInclude(uc=>uc.Course).Where(u => u.Password == userPassword).ToList()[0];
                List<string> courses = new List<string>();
                foreach(UsersCourse uc in user.UsersCourses)
                {
                    courses.Add(uc.Course.Name);

                }

                return Json(courses);
            }
        }


        [Authorize]
        public IActionResult CreateCourse([FromBody]CourseModel course)
        {
            using (LearnMasterContext db = new LearnMasterContext(Configuration["ConnectionString"]))
            {
                Course newCourse = new Course { Name = course.Name };
                db.Add(newCourse);
                db.SaveChanges();

                Debugger.Break();
                int userId = 0; 

                try
                {
                   userId = Int32.Parse(HttpContext.User.FindFirst("Id").Value);
                }
                catch (FormatException e)
                {
                    Console.WriteLine(e.Message);
                }


                UsersCourse uc = new UsersCourse {CourseId = newCourse.Id, UserId = userId};
                db.Add(uc);
                db.SaveChanges();
                
            }

            return Content("Created");
        }*/



    }
}