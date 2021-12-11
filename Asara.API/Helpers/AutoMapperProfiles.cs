using System.Linq;
using Asara.API.Dtos;
using Asara.API.Models;
using AutoMapper;

namespace Asara.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(){
                CreateMap<User, UserForJson>();
                CreateMap<User, UserForDetailedDto>();
                CreateMap<UserForRegisterDto, User>();
                CreateMap<Item, ItemDetailsDtos>();
                CreateMap<Item, ItemForJson>();
                CreateMap<ItemFromDtos, Item>().ForMember(dest => dest.UnitId, opt => {
                        opt.MapFrom(d =>d.UnitId);
                    });
                CreateMap<ItemMobilefromDtos, Item>();
                CreateMap<BillFromDtos, Bill>();
                CreateMap<Bill, BillDetailsDtos>();
                CreateMap<userForUpdateDtos, User>();
                CreateMap<BillItemDtos, BillItem>().ForMember(
                    dest => dest.ItemNavigation,
                    opt => {
                        opt.MapFrom(d => new Item(){Id=d.ItemId});
                    }
                );
                CreateMap<StockBillFromDtos, StockBill>();
                CreateMap<StockItemsFromDtos, StockItem>().ForMember(
                    dest => dest.ItemNavigation,
                     opt => {
                        opt.MapFrom(d => new Item(){Id=d.ItemId});
                    }
                );
                CreateMap<BillItem, BarrenDetailsDtos>().ForMember(
                    dest=> dest.CreatedAt,
                    opt => {
                        opt.MapFrom(d => d.BillNavigation.CreatedAt);
                    }
                ).ForMember(
                    dest => dest.Type,
                    opt => {
                        opt.MapFrom(d => d.BillNavigation.Type);
                    }
                ).ForMember(
                    dest => dest.Name,
                    opt => {
                        opt.MapFrom(d => d.ItemNavigation.Name);
                    }
                );
                CreateMap<StockItem, StockBillDetailsDtos>().ForMember(
                    dest=> dest.CreatedAt,
                    opt => {
                        opt.MapFrom(d => d.StockBill.CreatedAt);
                    }
                ).ForMember(
                    dest => dest.Type,
                    opt => {
                        opt.MapFrom(d => d.StockBill.Type);
                    }
                ).ForMember(
                    dest => dest.EmployeeName,
                    opt => {
                        opt.MapFrom(d => d.StockBill.UserNavigation.KnownAs);
                    }
                ).ForMember(
                    dest => dest.Worker,
                    opt => {
                        opt.MapFrom(d => d.StockBill.Worker);
                    }
                ).ForMember(
                    dest => dest.ItemName,
                    opt => {
                        opt.MapFrom(d => d.ItemNavigation.Name);
                    }
                );
                CreateMap<StockBill,StockBillDetail>();
                CreateMap<StockItem, StockItemDetails>();
                CreateMap<ExpensesFromDtos, Expenses>();
                CreateMap<Expenses, ExpensesDetailsDtos>();
                CreateMap<Bill, BillExpensesDetail>();
                CreateMap<BillItem, BillItemDetails>();
                CreateMap<ExtraExpensesFromDtos, ExtraExpenses>();
                CreateMap<ExtraExpenses, ExtraExpensesDetailsDtos>();
                CreateMap<AccountFromDtos, Account>();
                CreateMap<Account, AccountDetailsDtos>();
       }
    }
}