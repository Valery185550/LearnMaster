using IdentityServerAspNetIdentity.Data;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityServerAspNetIdentity.controllers
{
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }


        [Route("/User")]
        [HttpGet]
        public async Task<string> GetUser(string userId)
        {
            ApplicationUser user = await _userManager.FindByIdAsync(userId);
            return user.UserName;
        }
    }
}
