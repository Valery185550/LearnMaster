namespace WebApi.Models
{
    public class NotificationDTO
    {
        public long Id { get; set; }

        public string Text { get; set; } 

        public string StudentId { get; set; } 

        public long CourseId { get; set; }
    }
}
