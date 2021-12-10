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
    public class BillExpensesController:ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public BillExpensesController(DataContext dataContext, IMapper mapper){
            this.dataContext = dataContext;
            this.mapper = mapper;
        }   
        [HttpPost("client")]
        public async Task<IActionResult> GetClients (BillClientsDts billClientsDts) => Ok(await dataContext.Bills.Where(c => (c.CreatedAt.Date.Equals(billClientsDts.DateOfBill.Date) || c.ClientName.Contains(billClientsDts.ClientName)) && c.Type == billClientsDts.BillType 
           ).Select(d => new {d.ClientName}).Distinct().ToListAsync());
        
        [HttpPost]
        public async Task<IActionResult> GetBills(BillClientsDts billClientsDts) => Ok(
        mapper.Map<IEnumerable<BillExpensesDetail>>(
            await dataContext.Bills.Where(c => c.CreatedAt.Date.Equals(billClientsDts.DateOfBill.Date) && c.Type == billClientsDts.BillType && 
            c.ClientName.Contains(billClientsDts.ClientName)
           ).ToListAsync()
        ));
    }
}