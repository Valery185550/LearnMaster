using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("/")]
    [Authorize]
    public class HomeController : ControllerBase
    {
        LearnMasterContext db;
        public HomeController(LearnMasterContext db)
        {
            this.db = db;
        }
        
        [HttpGet]
        public IActionResult  Index()
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<UsersCourse> uc = db.UsersCourses.Include((p) => p.Course).Where((p) => p.UserId == userId).ToList();
            List<CourseDTO> courses = new List<CourseDTO>();
            uc.ForEach((u) => courses.Add(new CourseDTO { Name = u.Course.Name, Description = "" }));
            
            return new JsonResult(courses);
            
        }
    }
}
