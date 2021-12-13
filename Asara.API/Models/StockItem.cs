using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class StockItem
    {
        [Key]
        public int Id{get; set;}
        public double Quentity{get; set;}
        
        [ForeignKey("ItemNavigation")]
        public int ItemId{get; set;}

        public virtual Item ItemNavigation{get; set;}
        [ForeignKey("StockBill")]
        public int StockBillId{get; set;}

        public virtual StockBill StockBill{get; set;}

    }
}