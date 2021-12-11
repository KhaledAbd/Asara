using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using Asara.API.Data;
using Asara.API.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Asara.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BarrenExpensesController: ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public BarrenExpensesController(DataContext dataContext, IMapper mapper){
            this.dataContext = dataContext;
            this.mapper = mapper;
        } 
        [HttpGet("day/{date}")]
        public async Task<IActionResult> GetExpenses(DateTime date) => Ok(mapper.Map<IEnumerable<ExtraExpensesDetailsDtos>>(await dataContext.ExtraExpenses.Where(e => e.CreatedAt.Date.Equals(date.Date)).ToListAsync()));

        [HttpGet("month/{date}")]
        public async Task<IActionResult> GetExpensesByMonth(DateTime date) => Ok(mapper.Map<IEnumerable<ExtraExpensesDetailsDtos>>(await dataContext.ExtraExpenses.Where(e => e.CreatedAt.Month == date.Month && e.CreatedAt.Year == date.Year).ToListAsync()));
       
    }
} 