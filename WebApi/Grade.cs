using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Grade
{
    public long Id { get; set; }

    public long HomeworkId { get; set; }

    public long Mark { get; set; }

    public string StudentId { get; set; } = null!;

    public string TeacherId { get; set; } = null!;

    public virtual Homework Homework { get; set; } = null!;
}
