using System;
using System.Collections.Generic;

namespace WebApi;

public partial class Video
{
    public long Id { get; set; }

    public byte[] Data { get; set; } = null!;

    public long LessonId { get; set; }
}
