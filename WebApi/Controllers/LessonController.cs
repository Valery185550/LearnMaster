using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Diagnostics;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    public class LessonController : Controller
    {
        LearnMasterContext _db;
        public LessonController(LearnMasterContext db)
        {
            this._db = db;
        }

        [Route("/getLessons")]
        [HttpGet]
        public IActionResult Lessons(long courseId)
        {
            List<Lesson> lessons = _db.Lessons.Include((l) => l.Course).Where((l) => l.CourseId == courseId).ToList();
            List<LessonDTO> lessonDTOs = new List<LessonDTO>();
            
            lessons.ForEach((l) =>
            {
               
                 lessonDTOs.Add(new LessonDTO { Id = l.Id, CourseId = l.CourseId, Title = l.Title, ParentId = l.ParentId, Text = l.Text});
                
                
             });
            return new JsonResult(lessonDTOs);
        }

        [Route("/Lesson")]
        [HttpGet]
        public async Task<IActionResult> Lesson(long lessonId)
        {
            List<Lesson> lessons = _db.Lessons.Where((l) => l.Id == lessonId).ToList();
            if (lessons.Count > 0)
            {
                Lesson lesson = lessons[0];
                LessonDTO lessonDTO = new LessonDTO { Id = lesson.Id, CourseId = lesson.CourseId, ParentId = lesson.ParentId, Text = lesson.Text, Title = lesson.Title };
                return new JsonResult(lessonDTO);
            }
            return new JsonResult(null);
        }

        [Route ("/newLesson")]
        [HttpPost]
        public IActionResult NewLesson(LessonDTO lesson)
        {
            Lesson newLesson = new Lesson { Text = lesson.Text, CourseId = lesson.CourseId??0, Title = lesson.Title, ParentId = lesson.ParentId };
            _db.Lessons.Add(newLesson);
            _db.SaveChanges();

            if (lesson.Video!=null)
            {
                byte[] videoData = null;
                // считываем переданный файл в массив байтов
                using (var binaryReader = new BinaryReader(lesson.Video.OpenReadStream()))
                {
                    videoData = binaryReader.ReadBytes((int)lesson.Video.Length);
                }
                Video video = new Video { Data = videoData, LessonId = newLesson.Id };
                _db.Videos.Add(video);
                _db.SaveChanges();
            }

           
            return Lessons(lesson.CourseId ?? 0);
        }

        [Route("/video")]
        [HttpGet]
        public async Task<IActionResult> Video(long lessonId)
        {
            byte[] videoData = await getVideo(lessonId);
            if(videoData!= null)
            {
                return new FileContentResult(videoData, "video/mp4");
            }
            return new FileContentResult(videoData, "video/mp4");


        }

        [Route("/deleteLesson")]
        [HttpDelete] public IActionResult Delete(long lessonId, long courseId) {

            Lesson lesson = _db.Lessons.Where((l) => l.Id == lessonId).ToList()[0];
            if(lesson!= null)
            {
                _db.Lessons.Remove(lesson);
                _db.SaveChanges();
                return Lessons(courseId);
            }
            return Content("Not found lesson");
        }

        private async Task<byte[]> getVideo(long lessonId)
        {
            List<Video> videos = await _db.Videos.Where((v) => v.LessonId == lessonId).ToListAsync();
            if (videos.Count>0)
            {
                return  videos[0].Data;
            }

            return Array.Empty<byte>();
        }

    }
}
