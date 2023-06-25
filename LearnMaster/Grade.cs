using System;
using System.Collections.Generic;

namespace LearnMaster;

public partial class Grade
{
    public long Id { get; set; }

    public long LessonId { get; set; }

    public long UserId { get; set; }

    public long Grade1 { get; set; }

    public virtual Lesson Lesson { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
