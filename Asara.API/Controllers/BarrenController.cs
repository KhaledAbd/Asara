using System;
using System.Collections.Generic;
using System.Linq;
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
    public class BarrenController: ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public BarrenController(DataContext dataContext,  IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet("{day}")]
        public async Task<IEnumerable<BarrenDetailsDtos>> GetBarrenDaily(DateTime day) => 
        mapper.Map<IEnumerable<BarrenDetailsDtos>>(await dataContext.BillItems.Where
        (i => (i.BillNavigation.CreatedAt.Year == day.Year && i.BillNavigation.CreatedAt.Month == day.Month && i.BillNavigation.CreatedAt.Day == day.Day) ).ToListAsync());

        [HttpGet("year/{year}/month/{month}")]
        public async Task<IEnumerable<BarrenDetailsDtos>> GetBarrenMonthly(int year, int month) => 
        mapper.Map<IEnumerable<BarrenDetailsDtos>>(await dataContext.BillItems.Include(p => p.BillNavigation).Where
        (i => (i.BillNavigation.CreatedAt.Year == year && i.BillNavigation.CreatedAt.Month == month) ).ToListAsync());
    }
}