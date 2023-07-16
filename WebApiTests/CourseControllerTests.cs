using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using WebApi;
using WebApi.Controllers;
using WebApi.Models;

namespace WebApiTests
{
    public class CourseControllerTests
    {
        LearnMasterContext _db = new LearnMasterContext();
        CourseController _c;
        List<CourseDTO> courses = CourseControllerTestsData.courses;

        public CourseControllerTests()
        {
            this._c = new CourseController(_db);
            var usernameClaim = new Claim("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier", "6786ddf9-233e-4022-b2f2-5b03ae2e6b37"); //TestTeacher Alice idClaim
            var claims = new List<Claim> { usernameClaim };
            var claimsIdentity = new ClaimsIdentity(claims);
            var contextUser = new ClaimsPrincipal(claimsIdentity);
            var httpContext = new DefaultHttpContext()
            {
                User = contextUser
            };
            _c.ControllerContext.HttpContext = httpContext;
        }

        [Fact]
        public async void TestCoursesAction()
        {
            IActionResult result =  await _c.Courses();
            Assert.IsType<JsonResult>(result);

            JsonResult json = result as JsonResult;
            Assert.IsType<List<CourseDTO>>(json?.Value);
        }

        [Fact]
        public async void TestCourseAction()
        {
            for(int i =0; i<100; i++)
            {
                IActionResult result = await _c.Course(i);
                Assert.IsType<JsonResult>(result);
            }
        }

        [Fact]
        public void TestPostCourseAction()
        {
            courses.ForEach(async (c) =>
            {
                IActionResult result = await _c.PostCourse(c);
                Assert.IsType<JsonResult>(result);
            });
        }

        [Fact]
        public async void TestDeleteCourseAction()
        {
            List<UsersCourse> uc = await _db.UsersCourses.Where((uc) => uc.UserId == "6786ddf9-233e-4022-b2f2-5b03ae2e6b37").ToListAsync();
             uc.ForEach(async (uc) =>
            {
                IActionResult result =  await _c.DeleteCourse(uc.CourseId);
                Assert.IsType<JsonResult>(result);
            });
        }




    }
}