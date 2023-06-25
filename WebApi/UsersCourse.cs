using System;
using System.Collections.Generic;

namespace WebApi;

public partial class UsersCourse
{
    public long Id { get; set; }

    public string UserId { get; set; } = null!;

    public long CourseId { get; set; }

    public virtual Course Course { get; set; } = null!;
}
