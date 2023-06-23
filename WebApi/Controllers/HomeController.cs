using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Content("Server started");
        }
    }
}
