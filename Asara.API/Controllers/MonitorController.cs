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
    public class MonitorController: ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public MonitorController(DataContext dataContext, IMapper mapper){
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet("{day}")]
        public async Task<IActionResult> GetBarrenDaily(DateTime day) => Ok(
        mapper.Map<IEnumerable<StockBillDetailsDtos>>(await dataContext.StockItems.Where
        (i => (i.StockBill.CreatedAt.Year == day.Year && i.StockBill.CreatedAt.Month == day.Month && i.StockBill.CreatedAt.Day == day.Day) ).ToListAsync()));

        [HttpGet("year/{year}/month/{month}")]
        public async Task<IActionResult> GetBarrenMonthly(int year, int month) => Ok(
        mapper.Map<IEnumerable<StockBillDetailsDtos>>(await dataContext.StockItems.Include(p => p.StockBill.UserNavigation).Where
        (i => (i.StockBill.CreatedAt.Year == year && i.StockBill.CreatedAt.Month == month) ).ToListAsync()));

    }
}