using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Asara.API.Data;
using Asara.API.Dtos;
using Asara.API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Asara.API.Controllers
{
    [Authorize(Policy = "RequireAdminRole")]
    [ApiController]
    [Route("/api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public ItemController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IEnumerable<ItemDetailsDtos>> GetItems() => mapper.Map<IEnumerable<ItemDetailsDtos>>(await dataContext.Items.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> PostItem(ItemFromDtos itemFromDtos)
        {
            var isSaved = false;
            Item item = null;
            if (itemFromDtos != null)
            {
                item = mapper.Map<Item>(itemFromDtos);
                item.Quentity = 0;
                await dataContext.Items.AddAsync(item);
                await dataContext.SaveChangesAsync();
                isSaved = true;
            }
            return Ok(new { isSaved = isSaved, item = await dataContext.FindAsync<Item>(item.Id) });
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, ItemFromDtos itemFromDtos)
        {
            Item item = null;
            var isUpdated = false;
            if ((item = await dataContext.Items.FindAsync(id)) != null)
            {
                item.Price = itemFromDtos.Price;
                item.UnitNavigation = await dataContext.Units.FindAsync(itemFromDtos.UnitId);
                item.Name = itemFromDtos.Name;
                item.Type = itemFromDtos.Type;
                await dataContext.SaveChangesAsync();
                isUpdated = true;
            }
            return Ok(new { isUpdated = isUpdated, item = mapper.Map<ItemDetailsDtos>(item) });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var isDeleted = false;
            Item item = null;
            if ((item = await dataContext.Items.FindAsync(id)) != null)
            {
                dataContext.Items.Remove(item);
                await dataContext.SaveChangesAsync();
                isDeleted = true;
            }

            return Ok(new { isDeleted = isDeleted });
        }
    }
}