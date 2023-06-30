using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Notification
{
    public long Id { get; set; }

    public string Text { get; set; } = null!;

    public string StudentId { get; set; } = null!;

    public long CourseId { get; set; }

    public virtual Course Course { get; set; } = null!;
}
