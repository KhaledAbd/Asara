using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Asara.API.Data;
using Asara.API.Helpers;
using Asara.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace  Asara.API.Controllers
{
    [Route("/api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<Role> roleManager;
        private readonly DataContext context;
        public RoleController(UserManager<User> userManager, RoleManager<Role> roleManager, DataContext context)
        {
            this.context = context;
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        [HttpGet("{userId}")]
        [Authorize(Policy = "RequireAdminRole")]

        public async Task<IActionResult> GetUserRoles(int userId)
        {
            User user = await userManager.FindByIdAsync(userId.ToString());
            return Ok(userManager.GetRolesAsync(user).Result.Select(n => new{name = n}).ToList());
        }
        [HttpGet()]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> GetRoles() => Ok(await context.Roles.Select(n => new {id = n.Id, name = n.Name}).ToListAsync());
    }
}