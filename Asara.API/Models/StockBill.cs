using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class StockBill
    {
        [Key]
        public int Id {get; set;}

        [ForeignKey("UserNavigation")]
        public int UserId{get; set;}

        public virtual User UserNavigation{get; set;}

        public virtual IEnumerable<StockItem> StockItems {get; set;}
        
        public int Type {get; set;}

        public DateTime CreatedAt{get; set;}

        public string Worker{get; set;}
    }
}