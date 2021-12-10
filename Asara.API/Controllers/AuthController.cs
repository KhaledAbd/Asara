using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Asara.API.Models;
using Microsoft.AspNetCore.Identity;
using Asara.API.Dtos;
using Asara.API.Data;

namespace Asara.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    //// api/Auth/
    public class AuthController: ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthController(DataContext dataContext, IConfiguration _config, IMapper _mapper, UserManager<User> userManager, SignInManager<User> signInManager,RoleManager<Role> roleManager)
        {
            this.dataContext = dataContext;
            this._config = _config;
            this._mapper = _mapper;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }
        //// api/Auth/register
        [Authorize(policy:"RequireAdminRole")]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto){
            var userToCreate = _mapper.Map<User>(userForRegisterDto);
            var result = await userManager.CreateAsync(userToCreate, userForRegisterDto.Password);
            var userToReturn = _mapper.Map<UserForDetailedDto>(userToCreate);
            userManager.AddToRolesAsync(user: userToCreate, roles: new [] {"Employee"}).Wait();
            if(result.Succeeded){
                return CreatedAtRoute("GetUser", new {
                    Controller="Users", id = userToCreate.Id
                }, userToReturn);
            }
            return BadRequest(result.Errors);
        }
        //// api/Auth/Login

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto){
            var user = await userManager.FindByNameAsync(userForLoginDto.Username);
            var result = await signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
            if(result.Succeeded){
                var APIUser = await userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == userForLoginDto.Username.ToUpper());
                var userForReturn = _mapper.Map<UserForDetailedDto>(APIUser);
                return Ok(
                    new{
                        token = GenerateJwtToken(APIUser).Result,
                        user = userForReturn
                    }
                );
            }
            return Unauthorized();
        }
        [Authorize(policy:"RequireAdminRole")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id){
            var isDeleted = false;
            User user = null;
            if((user = await dataContext.FindAsync<User>(id)) != null && !(await userManager.GetRolesAsync(user)).Contains("Admin")){
                    await userManager.DeleteAsync(user);
                    isDeleted = true;
            }
            return Ok(new {isDeleted = isDeleted});
        }
        [HttpPut("{id}/changepassword")]
        public async Task<IActionResult> changePassword(int id, PasswordChangeFormDtos passwordChangeFormDtos){
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }
            var user = await userManager.FindByIdAsync(id.ToString());
            var isChanged = false;
            if(user != null){
                var result = await userManager.ChangePasswordAsync(user, passwordChangeFormDtos.Password, passwordChangeFormDtos.NewPassword);
                if(result.Succeeded){
                    isChanged = true;
                }
            }
            return Ok(new{isChanged = isChanged});

        }
        private async Task<string> GenerateJwtToken(User APIUser)
        {
            var claims = new List<Claim>{
                new Claim(ClaimTypes.NameIdentifier, APIUser.Id.ToString()),
                new Claim(ClaimTypes.Name, APIUser.NormalizedUserName)
            };
            var roles = await userManager.GetRolesAsync(APIUser);
            foreach(var role in roles){
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("APISettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(5),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
        [HttpPost("isexist")]
        public async Task<IActionResult> isExist(UserInfo username){
            var isExist = false;
            if(username != null){
                var result = await dataContext.Users.FirstOrDefaultAsync(p => p.UserName == username.Username);
                if(result!= null){
                    isExist = true;
                }
            }
            return Ok(new {isExist = isExist}); 
        }

    }
}