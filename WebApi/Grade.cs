using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Grade
{
    public long Id { get; set; }

    public long LessonId { get; set; }

    public long Grade1 { get; set; }

    public string StudentId { get; set; } = null!;

    public string TeacherId { get; set; } = null!;

    public virtual Lesson Lesson { get; set; } = null!;
}
