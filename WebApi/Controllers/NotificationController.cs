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
        LearnMasterContext _db;
        public NotificationController(LearnMasterContext db)
        {
            this._db = db;
        }

        [Route("/getNotifications")]
        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            string teacherId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            List<Course> teacherCourses = await _db.Courses.Include((c) => c.UsersCourses).Where((c) => c.UsersCourses.Any((uc) => uc.UserId == teacherId)).ToListAsync();
            List<Notification> teacherNotifications = await _db.Notifications.Include((n)=>n.Course).Where((n)=>teacherCourses.Contains(n.Course)).ToListAsync();
            List<NotificationDTO> result = new List<NotificationDTO>();
            HttpClient client= new HttpClient();
            teacherNotifications.ForEach((tn) => {
                result.Add(new NotificationDTO { Id=tn.Id, CourseId = tn.CourseId, Text = tn.Text }); });
            return new JsonResult(result);
        }

        

        [Route("/Join")]
        [HttpDelete]
        public async Task<IActionResult> Join (long notificationId)
        {
            List <Notification> notifications = await _db.Notifications.Where((n) => n.Id == notificationId).ToListAsync();
            Notification notification = notifications[0];
            if(notification != null)
            {
                UsersCourse uc = new UsersCourse { UserId = notification.StudentId, CourseId = notification.CourseId };
                _db.UsersCourses.Add(uc);
                _db.Notifications.Remove(notification);
                _db.SaveChanges();
            }

            return await GetNotifications();
        }

        [Route("/Reject")]
        [HttpDelete]
        public async Task<IActionResult> Reject(long notificationId)
        {
            Notification notification = _db.Notifications.Where((n) => n.Id == notificationId).ToList()[0];
            if (notification != null)
            {
                _db.Notifications.Remove(notification);
                _db.SaveChanges();
            }

            return await GetNotifications();
        }

    }
}
