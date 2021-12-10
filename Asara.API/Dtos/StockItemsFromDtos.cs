using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Dtos
{
    public class StockItemsFromDtos
    {
        public double Quentity{get; set;}
        
        public int ItemId{get; set;}

        public int StockBillId{get; set;}

    }
}