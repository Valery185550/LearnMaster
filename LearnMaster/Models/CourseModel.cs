using Microsoft.AspNetCore.Mvc;

namespace LearnMaster.Models
{
    public class CourseModel
    {
        [BindProperty(Name="courseName")]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}
