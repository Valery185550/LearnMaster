namespace WebApi.Models
{
    public class HomeworkDTO
    {
        public long? Id { get; set; }

        public long Mark { get; set; }

        public IFormFile? File { get; set; }

        public long? LessonId { get; set; }

        public string? StudentName { get; set; }

        public string? StudentId { get; set; }

        public bool? Read { get; set; }
    }
}
