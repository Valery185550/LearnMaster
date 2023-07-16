using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Homework
{
    public long Id { get; set; }

    public byte[]? File { get; set; }

    public string? StudentId { get; set; }

    public long? LessonId { get; set; }

    public virtual ICollection<Grade> Grades { get; set; } = new List<Grade>();
}
