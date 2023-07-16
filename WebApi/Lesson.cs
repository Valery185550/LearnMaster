using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Lesson
{
    public long Id { get; set; }

    public string Title { get; set; } = null!;

    public long? ParentId { get; set; }

    public long CourseId { get; set; }

    public string? Text { get; set; }

    public virtual Course Course { get; set; } = null!;
}
