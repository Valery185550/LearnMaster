using System;
using System.Collections.Generic;

namespace LearnMaster;

public partial class User
{
    public long Id { get; set; }

    public string Name { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string Password { get; set; } = null!;

    public virtual ICollection<Grade> Grades { get; set; } = new List<Grade>();

    public virtual ICollection<UsersCourse> UsersCourses { get; set; } = new List<UsersCourse>();
}
