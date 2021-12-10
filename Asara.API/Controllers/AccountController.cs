using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Asara.API.Data;
using Asara.API.Dtos;
using Asara.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Asara.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public AccountController(DataContext dataContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAccount() => Ok(mapper.Map<IEnumerable<AccountDetailsDtos>>(await dataContext.Account.Where(a => a.CreatedAt.Date.Equals(new DateTime().Date)).ToListAsync()));

        [HttpGet("{date}")]
        public async Task<IActionResult> GetAccountes(DateTime date) => Ok(mapper.Map<IEnumerable<AccountDetailsDtos>>(await dataContext.Account.Where(a => a.CreatedAt.Date.Equals(date.Date)).OrderBy(p => p.CreatedAt).ToListAsync()));

        [HttpPost]
        public async Task<IActionResult> PostAccount(AccountFromDtos accountFromDtos){
            var isSaved = false;
            Account account = null;
            if(accountFromDtos != null){
                if(accountFromDtos.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                    var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == accountFromDtos.UserId);
                    account = mapper.Map<Account>(accountFromDtos);
                    if(accountFromDtos.IsIntial){
                        user.Money += accountFromDtos.Money;
                    }else{
                        user.Money = accountFromDtos.Money;
                    }
                    await dataContext.Account.AddAsync(account);
                    await dataContext.SaveChangesAsync();
                    isSaved = true;
                }   
            }
            return Ok(new {account = mapper.Map<AccountDetailsDtos>(account), isSaved = isSaved});
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id){
            var isDeleted = false;
            Account account = await dataContext.Account.FirstOrDefaultAsync(a => a.Id == id);
            if(account != null){
                if(account.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                    if(account.IsIntial){
                        account.UserNavigation.Money -= account.Money;
                    }else{
                        account.UserNavigation.Money = account.LastUserMoney;
                    }
                    dataContext.Account.Remove(account);
                    await dataContext.SaveChangesAsync();
                    isDeleted = true;
                }   
            }
            return Ok(new { isDeleted = isDeleted});
        }

}
}