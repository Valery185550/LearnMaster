using System;
using System.Collections.Generic;

namespace LearnMaster;

public partial class UsersCourse
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public long CourseId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
