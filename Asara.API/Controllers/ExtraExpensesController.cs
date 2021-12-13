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
    public class ExtraExpensesController:ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public ExtraExpensesController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetExpenses() => Ok(mapper.Map<IEnumerable<ExtraExpensesDetailsDtos>>(await dataContext.ExtraExpenses.OrderBy(p => p.CreatedAt).ToListAsync()));

        [HttpGet("{date}")]
        public async Task<IActionResult> GetExpenses(DateTime date) => Ok(mapper.Map<IEnumerable<ExtraExpensesDetailsDtos>>(await dataContext.ExtraExpenses.Where(e => e.CreatedAt.Date.Equals(date.Date)).ToListAsync()));


        [HttpPost]
        public async Task<IActionResult> AddExpenses(ExtraExpensesFromDtos extraExpensesFromDtos){
            ExtraExpenses extraExpenses = null; 
            var isSaved = false;
            var isNotEnough = false;
            if(extraExpensesFromDtos != null){
                extraExpenses = mapper.Map<ExtraExpenses>(extraExpensesFromDtos);
                if(extraExpenses.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                    await dataContext.ExtraExpenses.AddAsync(extraExpenses);
                    extraExpenses.UserNavigation = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == extraExpenses.UserId);
                    extraExpenses.UserNavigation.Money -= extraExpenses.Paid;
                    await dataContext.SaveChangesAsync();
                    isSaved = true;
                }
            }
            return Ok(new {isSaved=isSaved , extraExpenses = mapper.Map<ExtraExpensesDetailsDtos>(extraExpenses), isNotEnough = isNotEnough});
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExtraExpenses(int id){
            ExtraExpenses extraExpenses = await dataContext.ExtraExpenses.FirstOrDefaultAsync(e => e.Id == id);
            var isDeleted = false;
            if(extraExpenses != null){
                dataContext.ExtraExpenses.Remove(extraExpenses);
                extraExpenses.UserNavigation.Money += extraExpenses.Paid;
                await dataContext.SaveChangesAsync();
                isDeleted = true;
            }
            return Ok(new {isDeleted=isDeleted});
        }
  
    }
}