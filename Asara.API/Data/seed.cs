using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asara.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Asara.API.Data
{
    public class Seed
    {
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
                if(!userManager.Users.Any()){
                    var roles = new List<Role>{
                        new Role{Name = "Admin"},
                        new Role{Name = "Employee"},
                        };
                    foreach(var role in roles){
                        roleManager.CreateAsync(role).Wait();
                    }
                    var adminUser = new User{
                        UserName = "khaled"
                    };
                   
                    IdentityResult identityResult = userManager.CreateAsync(adminUser, "password").Result;
                    if(identityResult.Succeeded){
                        var admin = userManager.FindByNameAsync("khaled").Result;
                        userManager.AddToRolesAsync(user: admin, roles: new [] {"Admin", "Employee"}).Wait();
                    }
                }
        }
    }
}