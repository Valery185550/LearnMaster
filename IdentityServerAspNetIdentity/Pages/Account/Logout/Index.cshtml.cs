using Duende.IdentityServer.Events;
using Duende.IdentityServer.Extensions;
using Duende.IdentityServer.Services;
using IdentityModel;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Diagnostics;

namespace IdentityServerAspNetIdentity.Pages.Logout;

[SecurityHeaders]
[AllowAnonymous]
public class Index : PageModel
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IIdentityServerInteractionService _interaction;

    [BindProperty]
    public string LogoutId { get; set; }

    public Index(SignInManager<ApplicationUser> signInManager, IIdentityServerInteractionService interaction, IEventService events)
    {
        _signInManager = signInManager;
        _interaction = interaction;
    }

    public async Task<IActionResult> OnGet(string logoutId)
    {
        var context = await _interaction.GetLogoutContextAsync(logoutId);
        await _signInManager.SignOutAsync();
        // see if we need to trigger federated logout
        var idp = User.FindFirst(JwtClaimTypes.IdentityProvider)?.Value;

        // if it's a local login we can ignore this workflow
        if (idp != null && idp != Duende.IdentityServer.IdentityServerConstants.LocalIdentityProvider)
        {
            // we need to see if the provider supports external logout
            if (await HttpContext.GetSchemeSupportsSignOutAsync(idp))
            {


                // this triggers a redirect to the external provider for sign-out
                return SignOut(new AuthenticationProperties { RedirectUri = context.PostLogoutRedirectUri }, idp);
            }
        }

        return Redirect(context.PostLogoutRedirectUri);

    }
}