using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Course
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public virtual ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();

    public virtual ICollection<UsersCourse> UsersCourses { get; set; } = new List<UsersCourse>();
}
