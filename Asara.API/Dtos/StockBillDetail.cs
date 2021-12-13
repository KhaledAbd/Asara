using System;
using System.Collections.Generic;

namespace Asara.API.Dtos
{
    public class StockBillDetail
    {
        public int Id {get; set;}

        public virtual UserForJson UserNavigation{get; set;}

        public virtual IEnumerable<StockItemDetails> StockItems {get; set;}
        
        public int Type {get; set;}

        public DateTime CreatedAt{get; set;}

        public string Worker{get; set;}
    }
}