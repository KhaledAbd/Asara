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
    public class MobileBarrenController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public MobileBarrenController(DataContext dataContext,  IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }
        [HttpGet("{day}")]
        public async Task<IActionResult> GetBarrenMobileDaily(DateTime day)
        {
            var billItems = await dataContext.BillItems.Where
            (i => i.BillNavigation.CreatedAt.Date.Equals(day.Date)).ToListAsync();
            List<BarrenItem> barrenItems = null;
            if (billItems != null)
            {
                barrenItems = new List<BarrenItem>();
                foreach (var billItem in billItems)
                {
                    if (barrenItems.Find(f => f.Item.Id == billItem.ItemId) == null)
                    {
                        barrenItems.Add(new BarrenItem
                        {
                            Item = mapper.Map<ItemForJson>(billItem.ItemNavigation),
                            PriceItems = new List<PriceItem>()
                        });
                        barrenItems.Last().PriceItems.Add(new PriceItem()
                        {
                            Type = billItem.BillNavigation.Type,
                            Quentity = billItem.Quentity,
                            Price = billItem.Price
                        });
                    }
                    else
                    {
                        BarrenItem barrenItem = barrenItems.Find(b => b.Item.Id == billItem.ItemId);
                        PriceItem priceItem = null;
                        if ((priceItem = barrenItem.PriceItems.Find(p => p.Price == billItem.Price)) != null)
                        {
                            priceItem.Quentity += billItem.Quentity;
                        }
                        else
                        {
                            barrenItem.PriceItems.Add(new PriceItem
                            {
                                Type = billItem.BillNavigation.Type,
                                Price = billItem.Price,
                                Quentity = billItem.Quentity
                            });
                        }

                    }
                }
            }
            return Ok(new Barren(){
                BarrenDate = day,
                BarrenItems = barrenItems});
        }

        [HttpGet("{type}/year/{year}/month/{month}")]
        public async Task<IEnumerable<BarrenItem>> GetBarrenMobileMonthly(int year, int month, int type)
        {
            var billItems = await dataContext.BillItems.Where(i => i.BillNavigation.CreatedAt.Year == year && i.BillNavigation.CreatedAt.Month == month && i.BillNavigation.Type == type).ToListAsync();
            List<BarrenItem> barrenItems = null;
            if (billItems != null)
            {
                barrenItems = new List<BarrenItem>();
                foreach (var billItem in billItems)
                {
                    if (barrenItems.Find(f => f.Item.Id == billItem.ItemId) == null)
                    {
                        barrenItems.Add(new BarrenItem
                        {
                            Item = mapper.Map<ItemForJson>(billItem.ItemNavigation),
                            PriceItems = new List<PriceItem>()
                        });
                        barrenItems.Last().PriceItems.Add(new PriceItem()
                        {
                            Quentity = billItem.Quentity,
                            Price = billItem.Price
                        });
                    }
                    else
                    {
                        BarrenItem barrenItem = barrenItems.Find(b => b.Item.Id == billItem.ItemId);
                        PriceItem priceItem = null;
                        if ((priceItem = barrenItem.PriceItems.Find(p => p.Price == billItem.Price && p.Type == billItem.BillNavigation.Type)) != null)
                        {
                            priceItem.Quentity += billItem.Quentity;
                        }
                        else
                        {
                            barrenItem.PriceItems.Add(new PriceItem
                            {
                                Price = billItem.Price,
                                Quentity = billItem.Quentity
                            });
                        }
                    }
                }
            }
            return barrenItems;
        }
    }
}



