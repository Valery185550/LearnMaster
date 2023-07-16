namespace WebApi.Models
{
    public class LessonDTO
    {
        public long? Id { get; set; }

        public string? Title { get; set; } = null!;

        public long? ParentId { get; set; }

        public long? CourseId { get; set; }

        public string? Text { get; set; }

        public IFormFile? Video { get; set; }
    }
}
