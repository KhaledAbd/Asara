using System.Collections.Generic;
using System.Threading.Tasks;
using Asara.API.Data;
using Asara.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Asara.API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly DataContext dataContext;
        public UnitController(DataContext dataContext)
        {
            this.dataContext = dataContext;

        }
        [HttpGet]
        public async Task<IEnumerable<Unit>> GetUnits() => await dataContext.Units.ToListAsync();
        [HttpPost]
        public async Task<IActionResult> PostUnits(Unit unit){
            var isSaved = false;
            if(unit != null){
                await dataContext.Units.AddAsync(unit);
                await dataContext.SaveChangesAsync();
                isSaved = true;
            }
            return Ok(new {isSaved = isSaved, unit = unit});
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUnit(int? id, Unit unit){
            Unit unitDB = dataContext.Units.Find(id);
            var isUpdated = false;
            if(id != null){
                if(unitDB != null){
                    unitDB.Name = unit.Name;
                    await dataContext.SaveChangesAsync();
                    isUpdated = true;
                }
            }
            return Ok(new {isUpdated = isUpdated, unit=unitDB});
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUnit(int? id){
            var isDeleted = false;
            if(id != null){
                dataContext.Units.Remove(await dataContext.Units.FindAsync(id));
                await dataContext.SaveChangesAsync();
                isDeleted = true;
            }
            return Ok(new {isDeleted = isDeleted});
        }

    }
}