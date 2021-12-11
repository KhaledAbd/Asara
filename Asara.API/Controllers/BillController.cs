using System;
using System.Collections.Generic;
using System.Linq;
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
    [Route("/api/[controller]")]
    public class BillController : ControllerBase
    {
        private readonly IMapper mapper;

        private readonly DataContext dataContext;
        public BillController(DataContext dataContext, IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IEnumerable<BillDetailsDtos>> GetAllBills() => mapper.Map<IEnumerable<BillDetailsDtos>>(await dataContext.Bills.ToListAsync());

        [HttpGet("{id}")]
        public async Task<BillDetailsDtos> GetBill(int id) => mapper.Map<BillDetailsDtos>(await dataContext.Bills.FirstOrDefaultAsync(b => b.Id == id));

        [HttpPost]
        public async Task<IActionResult> PostPill(BillFromDtos billFromDtos)
        {
            var isSaved = false;
            var isNotEnough = false;
            Bill bill = null;
            string reason = "";
            if (billFromDtos != null)
            {
                bill = mapper.Map<Bill>(billFromDtos);
                if ((bill.UserNavigation = await dataContext.FindAsync<User>(billFromDtos.UserId)) != null)
                {
                    if (bill.Type == 1)
                    {
                        foreach (var billItem in bill.BillItems)
                        {
                            billItem.ItemNavigation = await dataContext.FindAsync<Item>(billItem.ItemId);
                            if ((billItem.ItemNavigation.Quentity -= billItem.Quentity) < 0)
                            {
                                isNotEnough = true;
                            }
                        }
                        bill.UserNavigation.Money += bill.Paid;
                        reason= "دفعة الاموال المستله اول مره";
                    }
                    else if (bill.Type == 0)
                    {
                        foreach (var billItem in bill.BillItems)
                        {
                            billItem.ItemNavigation = await dataContext.FindAsync<Item>(billItem.ItemId);
                            billItem.ItemNavigation.Quentity += billItem.Quentity;
                        }
                        bill.UserNavigation.Money -= bill.Paid;
                        if(bill.UserNavigation.Money < 0)
                            isNotEnough = true;
                        reason= "دفعة الاموال المسلمة اول مره";
                        
                    }
                    var expenseses = new Expenses(){
                                                CreatedAt = bill.CreatedAt,
                                                Reason = reason,
                                                Paid = bill.Paid,
                                                UserId = bill.UserId,
                                                BillNavigation= bill
                                            };
                    await dataContext.AddAsync<Expenses>(expenseses);
                    await dataContext.SaveChangesAsync();
                    isSaved = true;
                }
            }
            return Ok(new { isSaved = isSaved, bill = mapper.Map<BillDetailsDtos>(bill), isNotEnough = isNotEnough });
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBill(int? id)
        {
            var isDeleted = false;
            var isNotEnough = false;
            Bill bill = await dataContext.FindAsync<Bill>(id);
            if (bill != null)
            {
                if (bill.Type == 1)
                {
                    foreach (var billItem in bill.BillItems)
                    {
                        billItem.ItemNavigation.Quentity += billItem.Quentity;
                    }
                     if((bill.UserNavigation.Money -= bill.Paid) < 0)
                            isNotEnough = true;
                }
                else if (bill.Type == 0)
                {
                    foreach (var billItem in bill.BillItems)
                    {
                        if ((billItem.ItemNavigation.Quentity -= billItem.Quentity) < 0)
                        {
                            throw new System.Exception("المخزون ليس كافى");
                        }
                    }
                    bill.UserNavigation.Money += bill.Paid;
                }
                dataContext.Remove<Bill>(bill);
                await dataContext.SaveChangesAsync();
                isDeleted = true;
            }else
            {
                isDeleted = true;
            }
            return Ok(new { isDeleted = isDeleted, isNotEnough= isNotEnough });
        }
    }

}