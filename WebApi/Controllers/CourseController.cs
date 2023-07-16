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
        LearnMasterContext _db;
        public CourseController(LearnMasterContext db)
        {
            this._db = db;
        }

        [Route("/getCourses")]
        [HttpGet]
        public async Task<IActionResult>  Courses()
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<UsersCourse> uc = await _db.UsersCourses.Include((p) => p.Course).Where((p) => p.UserId == userId).ToListAsync();
            List<CourseDTO> courses = new List<CourseDTO>();
            uc.ForEach((u) => courses.Add(new CourseDTO { Title = u.Course.Title, Description = u.Course.Description, Id = u.CourseId }));
            
            return new JsonResult(courses);
            
        }

        [Route("Course")]
        [HttpGet]
        public async Task<IActionResult> Course(long courseId)
        {
            List<Course> courses = await _db.Courses.Where((c)=>c.Id==courseId).ToListAsync();
            if (courses.Count>0)
            {
                Course course = courses[0];
                CourseDTO courseDTO= new CourseDTO { Id=course.Id, Title=course.Title, Description=course.Description };
                return new JsonResult(courseDTO);
            }
            return new JsonResult(null);
        }

        [Route("/Course/PostCourse")]
        [HttpPost]
        public async Task<IActionResult> PostCourse([FromBody] CourseDTO course)
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            
            Course newCourse = new Course { Title = course.Title, Description=course.Description };
            _db.Courses.Add(newCourse);

            UsersCourse uc = new UsersCourse { Course= newCourse, UserId=userId};
            _db.UsersCourses.Add(uc);

            _db.SaveChanges();

            return await Courses();
        }

        [Route("/DeleteCourse")]
        [HttpDelete]
        public async Task<IActionResult> DeleteCourse(long id)
        {
            List<Course> courses = await _db.Courses.Include((c) =>c.UsersCourses).Where(c => c.Id == id).ToListAsync();
            if (courses.Count > 0)
            {
                Course course = courses[0];
                _db.Courses.Remove(course);
                _db.SaveChanges();
            }
            return await Courses();
        }

        [Route("/LeaveCourse")]
        [HttpDelete]
        public async Task<IActionResult> LeaveCourse(long id)
        {
            Course course = _db.Courses.Include((c) => c.UsersCourses).Where(c => c.Id == id).ToList()[0];
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            if (course != null)
            {
                foreach(UsersCourse uc in course.UsersCourses.ToList())
                {
                    if (uc.UserId == userId)
                    {
                        _db.UsersCourses.Remove(uc);
                        _db.SaveChanges();
                    }
                }
            }

            return await Courses();
        }

        [Route("/SearchCourse")]
        [HttpGet]
        public async Task<IActionResult> SearchCourse(string title)
        {
            
            List<Course> allCoursesByName = _db.Courses.Include((c) => c.Notifications).Include((c)=>c.UsersCourses).Where((c) => c.Title == title).ToList();
            string studentId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<CourseDTO> result = new List<CourseDTO>();
            foreach (Course course in allCoursesByName)
            {
                bool applied = false;
                if (course.Notifications.Any((n) => n.StudentId == studentId) || (course.UsersCourses.Any((uc)=>uc.UserId == studentId)))
                {
                    applied= true;
                }
               
                result.Add(new CourseDTO { Id=course.Id, Applied = applied, Description = course.Description, Title = course.Title });
                
            }

            return new JsonResult(result);
        }

        [Route("/Apply")]
        [HttpPost]
        public async Task<IActionResult> Apply(long id)
        {
            
            Course course = _db.Courses.Include((c) => c.UsersCourses).Where(c => c.Id == id).ToList()[0];
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            List<Notification> alreadyApplied = _db.Notifications.Where(n => n.CourseId == course.Id && n.StudentId == userId).ToList();
            List<UsersCourse> alreadyRegistered = _db.UsersCourses.Where((uc) => uc.UserId == userId && uc.CourseId == id).ToList();

            if (alreadyApplied.Count > 0 || alreadyRegistered.Count > 0)
            {
                return await Courses(); //if already applied just rerurn courses
            }

            if (course != null)
            { 
            
                HttpClient client = new HttpClient();
                string studentName = await client.GetStringAsync($"https://localhost:5001/User?userId={userId}");
                Notification n = new Notification { CourseId = course.Id, StudentId = userId, Text = $"{studentName}   wants to join to your course {course.Title}" };
                _db.Notifications.Add(n);
                _db.SaveChanges();
                
            }

            return await SearchCourse(course.Title);
        }

    }
}
