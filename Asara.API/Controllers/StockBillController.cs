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
    public class StockBillController: ControllerBase
    {
        
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public StockBillController(DataContext dataContext, IMapper mapper){
            this.dataContext = dataContext;
            this.mapper = mapper;
        }   
        [HttpPost("worker")]
        public async Task<IActionResult> GetClients (BillWorkerDtos billWorkerDtos) => Ok(await dataContext.StockBills.Where(c => (c.CreatedAt.Date.Equals(billWorkerDtos.DateOfStockBill.Date) || c.Worker.Contains(billWorkerDtos.Worker)) && c.Type == billWorkerDtos.BillStockType 
           ).Select(d => new {d.Worker}).Distinct().ToListAsync());
        
        [HttpPost]
        public async Task<IActionResult> GetBills(BillWorkerDtos billWorkerDtos) => Ok(
        mapper.Map<IEnumerable<StockBillDetail>>(
            await dataContext.StockBills.Where(c => c.CreatedAt.Date.Equals(billWorkerDtos.DateOfStockBill.Date) && c.Type == billWorkerDtos.BillStockType && 
            c.Worker.Contains(billWorkerDtos.Worker)
           ).ToListAsync()
        ));

    }
}