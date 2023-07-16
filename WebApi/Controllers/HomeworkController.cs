using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{

    [Authorize]
    public class HomeworkController : Controller
    {
        LearnMasterContext _db;
        public HomeworkController(LearnMasterContext db)
        {
            this._db = db;
        }

        [Route("/Homeworks")]
        [HttpGet]
        public async Task<IActionResult> GetHomeworks(long lessonId)
        {
            List<Homework> homeworks = await _db.Homeworks.Where((h) => h.LessonId == lessonId).ToListAsync();
            if (homeworks.Count > 0)
            {
                HttpClient client= new HttpClient();

                List<HomeworkDTO> homeworkDTOs= new List<HomeworkDTO>();
                foreach(Homework h in homeworks)
                {
                    string studentName = await client.GetStringAsync($"https://localhost:5001/User?userId={h.StudentId}");
                    List<Grade> grades = await _db.Grades.Where((g)=>g.HomeworkId==h.Id).ToListAsync();
                    long mark = 0;
                    if (grades.Count > 0)
                    {
                        Grade grade = grades[0];
                        mark = grade.Mark;
                    }
                    homeworkDTOs.Add(new HomeworkDTO {StudentName=studentName, Id=h.Id, Mark = mark });
                }
                return new JsonResult(homeworkDTOs);
            }
            return new JsonResult(null);
        }

        [Route("/Homework")]
        [HttpGet]
        public async Task<IActionResult> GetHomeWork(long homeworkId) 
        {
            List<Homework> homeworks = await _db.Homeworks.Where((h)=>h.Id==homeworkId).ToListAsync(); 
            if (homeworks.Count > 0)
            {
                HttpClient client = new HttpClient();
                Homework homework = homeworks[0];
                List<Grade> grades = await _db.Grades.Where((g)=>g.HomeworkId== homework.Id).ToListAsync();
                long mark = 0;
                if (grades.Count > 0)
                {
                    Grade grade = grades[0];
                    mark = grade.Mark;
                }
                string studentName = await client.GetStringAsync($"https://localhost:5001/User?userId={homework.StudentId}");
                return new JsonResult(new HomeworkDTO { Id = homework.Id, LessonId = homework.LessonId, StudentName= studentName, StudentId = homework.StudentId, Mark = mark
                });
            }
            return null;
        }

        [Route("/HomeworkFile")]
        [HttpGet]
        public async Task<IActionResult> GetHomeworkFile(long homeworkId)
        {
            List<Homework> homeworks = await _db.Homeworks.Where((h) => h.Id == homeworkId).ToListAsync();
            if(homeworks.Count > 0)
            {
                Homework homework = homeworks[0];
                return  new FileContentResult(homework.File, "image/jpeg");
            }
            return null;
        }


        [Route("/Homework")]
        [HttpPost]
        public IActionResult PostHomework (HomeworkDTO homework)
        {
            string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
            byte[] data = null;
            if(homework == null)
            {
                return BadRequest();
            }
            if (homework.File != null)
            {
                using (var binaryReader = new BinaryReader(homework.File.OpenReadStream()))
                {
                    data = binaryReader.ReadBytes((int)homework.File.Length);
                }
            }
            Homework newHomework = new Homework { File = data, LessonId = homework.LessonId, StudentId=userId};
            _db.Homeworks.Add(newHomework);
            _db.SaveChanges();
            return Content("OK");
        }

        [Route("/Grade")]
        [HttpPost]
        public async Task<IActionResult> GiveGrade( long homeworkId, int mark, string studentId)
        {
            if((mark>=1) && (mark <= 12))
            {
                string userId = HttpContext.User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value;
                _db.Grades.Add(new Grade { HomeworkId = homeworkId, Mark=mark,StudentId=studentId, TeacherId=userId});
                _db.SaveChanges();
                return Content("OK");
            }
            return BadRequest();
            
        }
    }
}
