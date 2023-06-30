using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using WebApi.Models;

namespace WebApi.Controllers
{

    [Authorize]
    public class NotificationController : Controller
    {
        LearnMasterContext db;
        public NotificationController(LearnMasterContext db)
        {
            this.db = db;
        }

        [Route("/getNotifications")]
        [HttpGet]
        public IActionResult GetNotifications()
        {
            Debugger.Break();
            string teacherId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            List<Course> teacherCourses = db.Courses.Include((c) => c.UsersCourses).Where((c) => c.UsersCourses.Any((uc) => uc.UserId == teacherId)).ToList();
            List<Notification> teacherNotifications = db.Notifications.Include((n)=>n.Course).Where((n)=>teacherCourses.Contains(n.Course)).ToList();
            List<NotificationDTO> result = new List<NotificationDTO>();
            teacherNotifications.ForEach((tn) => { result.Add(new NotificationDTO { Id=tn.Id, CourseId = tn.CourseId, StudentId= tn.StudentId, Text = tn.Text }); });
            return new JsonResult(result);
        }

        

        [Route("/Join")]
        [HttpDelete]
        public IActionResult Join (long notificationId)
        {
            Notification notification = db.Notifications.Where((n) => n.Id == notificationId).ToList()[0];
            if(notification != null)
            {
                UsersCourse uc = new UsersCourse { UserId = notification.StudentId, CourseId = notification.CourseId };
                db.UsersCourses.Add(uc);
                db.Notifications.Remove(notification);
                db.SaveChanges();
            }

            return GetNotifications();
            
            
        }

        [Route("/Reject")]
        [HttpDelete]
        public IActionResult Reject(long notificationId)
        {
            Notification notification = db.Notifications.Where((n) => n.Id == notificationId).ToList()[0];
            if (notification != null)
            {
                db.Notifications.Remove(notification);
                db.SaveChanges();
            }

            return GetNotifications();
        }

    }
}
