namespace WebApi.Models
{
    public class MessageDTO
    {
        public long? Id { get; set; }

        public string UserName { get; set; }

        public string? Date { get; set; }

        public string? Text { get; set; }

        public long? CourseId { get; set; }

    }
}
