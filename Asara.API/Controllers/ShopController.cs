using System.Threading.Tasks;
using Asara.API.Data;
using Asara.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Asara.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShopController: ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public ShopController(DataContext dataContext, IMapper mapper){
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetShop() => Ok(await dataContext.Shops.FirstOrDefaultAsync());
        [HttpPost]
        public async Task<IActionResult> PostShop(Shop shopfromDtos) {
            Shop shop;
            var isSaved = false;
            var isUpdated = false;
            if((shop = await dataContext.Shops.FirstOrDefaultAsync()) != null){
                shop.Address = shopfromDtos.Address;
                shop.Name = shopfromDtos.Name;
                shop.Title = shopfromDtos.Title;
                shop.Telephone = shopfromDtos.Telephone;
                isUpdated = true;
            }else {
                dataContext.Add<Shop>(shopfromDtos);
                isSaved = true;
            }
            await dataContext.SaveChangesAsync();
            return Ok(new {isSaved= isSaved, isUpdated = isUpdated, shop = shop});
        }

    }
}