using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApi.Models;

namespace WebApiTests
{
    internal class CourseControllerTestsData
    {
        public static List<CourseDTO> courses = new List<CourseDTO> { new CourseDTO { Id=1, Title= "Fundamentals of digital marketing", Description= "Master the basics of digital marketing with our free Interactive Advertising Bureau-accredited course. There are 26 modules to explore, all created by Google trainers, packed full of practical exercises and real-world examples to help you turn knowledge into action.", Applied=true },
        new CourseDTO {Id=2, Title="Get a business online", Description="Start our free course to discover what it takes to start and run a successful business online. You'll also learn how to build a digital presence, use e-commerce, keep a business safe from hackers, and get noticed locally.", Applied=false },
        new CourseDTO {Id=3, Title="Make sure customers find you online", Description="Start our free course to discover just some of the ways businesses can reach and connect with more customers online. Plus, learn how to improve your search engine performance (SEO), and use online advertising (SEM) to boost sales and awareness.", Applied= true },
        new CourseDTO {Id=4, Title="Promote a business with online advertising", Description = "Start our free course and learn how to promote a business online. We'll tell you how to create a successful advertising and marketing strategy, and explain how email marketing, video and display ads can help you reach and attract more of the right customers.", Applied=false },
        new CourseDTO {Id=5, Title="Expand a business to other countries", Description = "Want to know what it takes to go global? Discover how to enter new markets and sell to customers around the world, with our free course on how to expand a business internationally.", Applied=false }
        };

    }
}
