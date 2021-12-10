using System.Collections;
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
    public class ExpensesController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public ExpensesController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetExpenses(int id) => Ok(mapper.Map<IEnumerable<ExpensesDetailsDtos>>(await dataContext.Expenses.Where(
            e => e.BillId == id
        ).ToListAsync()));

        [HttpPost]
        public async Task<IActionResult> AddExpenses(ExpensesFromDtos expensesFromDtos){
            Expenses expenses = null; 
            var isSaved = false;
            var isNotEnough = false;
            if(expensesFromDtos != null){
                expenses = mapper.Map<Expenses>(expensesFromDtos);
                expenses.BillNavigation = await dataContext.Bills.FirstOrDefaultAsync(b => b.Id == expensesFromDtos.BillId);
                if(expenses.UserId == int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                    expenses.BillNavigation.Paid += expenses.Paid;
                    expenses.UserNavigation = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == expenses.UserId); 
                    if(expenses.BillNavigation.Type == 1){
                        expenses.UserNavigation.Money += expenses.Paid;
                    }else if((expenses.UserNavigation.Money  = expenses.UserNavigation.Money - expenses.Paid) >= 0)
                            isNotEnough = true;
                    await dataContext.Expenses.AddAsync(expenses);
                    await dataContext.SaveChangesAsync();
                    isSaved = true;
                }
            }
            return Ok(new {isSaved=isSaved , expenses = mapper.Map<ExpensesDetailsDtos>(expenses), isNotEnough = isNotEnough});
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpenses(int id){
            Expenses expenses = await dataContext.Expenses.FirstOrDefaultAsync(e =>e.Id == id);
            var isDeleted = false;
            var isNotEnough = false;
            if(expenses != null){
                dataContext.Expenses.Remove(expenses);
                expenses.BillNavigation.Paid -= expenses.Paid;
                if(expenses.BillNavigation.Type == 0){
                        expenses.UserNavigation.Money += expenses.Paid;
                }else if((expenses.UserNavigation.Money -= expenses.Paid) >= 0)
                            isNotEnough = true;
                await dataContext.SaveChangesAsync();
                isDeleted = true;
            }
            return Ok(new {isDeleted = isDeleted, isNotEnough = isNotEnough});
        }
    }
}