// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityModel;
using IdentityServer4;
using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Stores;
using IdentityServer4.Test;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace IdentityServer.Controllers
{
    /// <summary>
    /// This sample controller implements a typical login/logout/provision workflow for local and external accounts.
    /// The login service encapsulates the interactions with the user data store. This data store is in-memory only and cannot be used for production!
    /// The interaction service provides a way for the UI to communicate with identityserver for validation and context retrieval
    /// </summary>

    [AllowAnonymous]
    public class AccountController : Controller
    {
        private readonly TestUserStore _users;


        public AccountController(
            TestUserStore users = null)
        {
            _users = users ?? new TestUserStore(TestUsers.Users);
        }


        [HttpGet]
        public async Task<IActionResult> Login(string returnUrl)
        {

            return RedirectPermanent("https://localhost:5173/AuthPage");
        }


        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            Debugger.Break();
            if (_users.ValidateCredentials(username, password))
            {
                var user = _users.FindByUsername(username);
                var isuser = new IdentityServerUser(user.SubjectId)
                {
                    DisplayName = user.Username
                };
                await HttpContext.SignInAsync(isuser);
                return Content("Logged in");
            }
            return Content("Not logged in");
        }



    }
}
