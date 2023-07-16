using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Message
{
    public long Id { get; set; }

    public string Text { get; set; } = null!;

    public long CourseId { get; set; }

    public string? UserId { get; set; }

    public string? Date { get; set; }

    public virtual Course Course { get; set; } = null!;
}
