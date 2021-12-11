
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
    public class StockController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public StockController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }
        [HttpGet("{id}")]
        public async Task<StockBillDetail> GetBill(int id) => mapper.Map<StockBillDetail>(await dataContext.StockBills.FirstOrDefaultAsync(b => b.Id == id));

        [HttpPost]
        public async Task<IActionResult> PostStockPill(StockBillFromDtos stockBillFromDtos)
        {
            if (stockBillFromDtos.UserId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var isSaved = false;
            StockBill stockBill = null;
            if (stockBillFromDtos != null)
            {
                stockBill = mapper.Map<StockBillFromDtos, StockBill>(stockBillFromDtos);
                if ((stockBill.UserNavigation = await dataContext.FindAsync<User>(stockBill.UserId)) != null)
                {
                    if (stockBill.Type == 1)
                    {
                        foreach (var stockItem in stockBill.StockItems)
                        {
                            stockItem.ItemNavigation = await dataContext.FindAsync<Item>(stockItem.ItemId);
                            if ((stockItem.ItemNavigation.Quentity -= stockItem.Quentity) < 0)
                            {
                                throw new System.Exception("المخزون ليس كافى");
                            }
                        }
                    }
                    else if (stockBill.Type == 0)
                    {
                        foreach (var stockItem in stockBill.StockItems)
                        {
                            stockItem.ItemNavigation = await dataContext.FindAsync<Item>(stockItem.ItemId);
                            stockItem.ItemNavigation.Quentity += stockItem.Quentity;
                        }
                    }
                    await dataContext.AddAsync<StockBill>(stockBill);
                    await dataContext.SaveChangesAsync();
                    isSaved = true;
                }
            }
            return Ok(new { isSaved = isSaved, stockBill = mapper.Map<StockBillDetail>(stockBill) });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStockBill(int? id)
        {
            var isDeleted = false;
            var isNotEnough = false;
            StockBill stockBill = await dataContext.FindAsync<StockBill>(id);
            if (stockBill != null)
            {
                if (stockBill.Type == 1)
                {
                    foreach (var stockItem in stockBill.StockItems)
                    {
                        stockItem.ItemNavigation.Quentity += stockItem.Quentity;
                    }
                }
                else if (stockBill.Type == 0)
                {
                    foreach (var stockItem in stockBill.StockItems)
                    {
                        if ((stockItem.ItemNavigation.Quentity -= stockItem.Quentity) < 0)
                        {
                            isNotEnough = true;
                        }
                    }
                }
                if(isNotEnough == false){
                    dataContext.Remove<StockBill>(stockBill);
                    await dataContext.SaveChangesAsync();
                    isDeleted = true;   
                }
            }else{
                isDeleted=true;
            }
            return Ok(new { isDeleted = isDeleted, isNotEnough = isNotEnough });
        }
    }
}
