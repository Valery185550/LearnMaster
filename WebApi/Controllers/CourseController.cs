using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Security.Claims;
using WebApi.Models;

namespace WebApi.Controllers
{
    
    [Authorize]
    public class CourseController : ControllerBase
    {
        LearnMasterContext db;
        public CourseController(LearnMasterContext db)
        {
            this.db = db;
        }

        [Route("/getCourses")]
        [HttpGet]
        public IActionResult  Courses()
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<UsersCourse> uc = db.UsersCourses.Include((p) => p.Course).Where((p) => p.UserId == userId).ToList();
            List<CourseDTO> courses = new List<CourseDTO>();
            uc.ForEach((u) => courses.Add(new CourseDTO { Name = u.Course.Name, Description = u.Course.Description, Id = u.CourseId }));
            
            return new JsonResult(courses);
            
        }

        [Route("/Course/PostCourse")]
        [HttpPost]
        public IActionResult PostCourse([FromBody] CourseDTO course)
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            
            Course newCourse = new Course { Name = course.Name, Description=course.Description };
            db.Courses.Add(newCourse);

            UsersCourse uc = new UsersCourse { Course= newCourse, UserId=userId};
            db.UsersCourses.Add(uc);

            db.SaveChanges();
            return Content("OK");
        }

        [Route("/DeleteCourse")]
        [HttpDelete]
        public IActionResult DeleteCourse(long id)
        {
            Course course = db.Courses.Include((c) =>c.UsersCourses).Where(c => c.Id == id).ToList()[0];
            if(course!= null)
            {
                db.Courses.Remove(course);
                db.SaveChanges();
            }

            return new JsonResult(db.Courses.ToList()); 
        }

    }
}
