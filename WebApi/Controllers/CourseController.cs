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

            return Courses();
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

            return Courses();
        }

        [Route("/LeaveCourse")]
        [HttpDelete]
        public IActionResult LeaveCourse(long id)
        {
            Course course = db.Courses.Include((c) => c.UsersCourses).Where(c => c.Id == id).ToList()[0];
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            if (course != null)
            {
                foreach(UsersCourse uc in course.UsersCourses.ToList())
                {
                    if (uc.UserId == userId)
                    {
                        db.UsersCourses.Remove(uc);
                        db.SaveChanges();
                    }
                }
            }

            return Courses();
        }

        [Route("/SearchCourse")]
        [HttpGet]
        public IActionResult SearchCourse(string name)
        {
            Debugger.Break();
            List<Course> allCoursesByName = db.Courses.Include((c) => c.Notifications).Include((c)=>c.UsersCourses).Where((c) => c.Name == name).ToList();
            string studentId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<CourseDTO> result = new List<CourseDTO>();
            foreach (Course course in allCoursesByName)
            {
                bool applied = false;
                if (course.Notifications.Any((n) => n.StudentId == studentId) || (course.UsersCourses.Any((uc)=>uc.UserId == studentId)))
                {
                    applied= true;
                }
               
                result.Add(new CourseDTO { Id=course.Id, Applied = applied, Description = course.Description, Name=course.Name});
                
            }

            return new JsonResult(result);
        }

        [Route("/Apply")]
        [HttpPost]
        public IActionResult Apply(long id)
        {
             Debugger.Break();
            Course course = db.Courses.Include((c) => c.UsersCourses).Where(c => c.Id == id).ToList()[0];
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<Notification> alreadyApplied = db.Notifications.Where(n => n.CourseId == course.Id && n.StudentId == userId).ToList();
            List<UsersCourse> alreadyRegistered = db.UsersCourses.Where((uc) => uc.UserId == userId && uc.CourseId == id).ToList();

            if (alreadyApplied.Count > 0 || alreadyRegistered.Count > 0)
            {
                return Courses(); //if already applied just rerurn courses
            }

            if (course != null)
            {
                Notification n = new Notification { CourseId = course.Id, StudentId = userId, Text = $"{userId} wants to join to your course" };
                db.Notifications.Add(n);
                db.SaveChanges();
                
            }

            return SearchCourse(course.Name);
        }

    }
}
