using System;
using System.Collections.Generic;

namespace Asara.API.Dtos
{
    public class StockBillFromDtos
    {
        public int UserId{get; set;}

        public virtual IEnumerable<StockItemsFromDtos> StockItems {get; set;}
        
        public int Type {get; set;}

        public DateTime CreatedAt{get; set;}

        public string Worker{get; set;}
    }
}