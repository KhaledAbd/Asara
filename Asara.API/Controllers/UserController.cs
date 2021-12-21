
using System.Threading.Tasks;
using AutoMapper;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Asara.API.Data;
using Asara.API.Dtos;
using Asara.API.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Linq;
using System.IO;

namespace Asara.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[Controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;
        public UsersController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            return Ok(mapper.Map<UserForDetailedDto>(await dataContext.FindAsync<User>(id)));
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers() => Ok(mapper.Map<IEnumerable<UserForDetailedDto>>(await dataContext.Users.Where(u => u.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)).ToListAsync()));

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInfo(int id, userForUpdateDtos userForUpdateDtos)
        {
            var isUpdate = false;
            User user = null; 
            if ((id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)))
            {
                return Unauthorized();
            }
            if(!Directory.Exists(userForUpdateDtos.Folder)){
                return Unauthorized();
            }
            if ((user = await dataContext.Users.FindAsync(id)) != null)
            {
                user.City = userForUpdateDtos.City;
                user.UserName = userForUpdateDtos.Username;
                user.Telephone = userForUpdateDtos.Telephone;
                user.KnownAs = userForUpdateDtos.KnownAs;
                user.DateOfBirth = userForUpdateDtos.DateOfBirth;
                user.Folder = userForUpdateDtos.Folder;
                user.NormalizedUserName = userForUpdateDtos.Username.ToUpper();
                await dataContext.SaveChangesAsync();
                isUpdate = true;

            }
            return Ok(new {isUpdate = isUpdate });

        }
    }
}