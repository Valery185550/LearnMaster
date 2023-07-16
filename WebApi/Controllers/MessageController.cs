using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{

    public class MessageController : Controller
    {
        

        LearnMasterContext _db;
        public MessageController(LearnMasterContext db)
        {
            this._db = db;
        }

        [Route("/Messages")]
        [HttpGet]
        public async Task<IActionResult> GetMessages(long courseId)
        {
            List<Message> messages = await _db.Messages.Where((m) => m.CourseId == courseId).ToListAsync();
            List<MessageDTO> messagesDTO = new List<MessageDTO>();
            if (messages.Count > 0)
            {
                HttpClient client= new HttpClient();
                foreach(Message m in messages)
                {
                    string userName = await client.GetStringAsync($"https://localhost:5001/User?userId={m.UserId}");
                    messagesDTO.Add(new MessageDTO {Id = m.Id,  Text = m.Text, CourseId = m.CourseId, Date = m.Date, UserName = userName});
                }
                
            }
            return new JsonResult(messagesDTO);

        }

        [Route("/Message")]
        [HttpPost]
        public async Task<string> SaveMessage([FromBody] MessageDTO message) 
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;

            _db.Messages.Add(new Message { CourseId = message.CourseId??0, Date = message.Date, Text = message.Text, UserId = userId });
            _db.SaveChanges();
            string studentName = "";
            try
            {
                HttpClient client = new HttpClient();
                studentName = await client.GetStringAsync($"https://localhost:5001/User?userId={userId}");
            }
            catch(Exception ex) 
            {
                Console.WriteLine(ex.Message);
            }
            return studentName;
        }


    }
}
