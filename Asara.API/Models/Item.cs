using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class Item
    {
        [Key]
        public int Id {get; set;}   
        public string Name{get; set;}
        public double Price{get; set;}
        public double Quentity {get; set;}  ///ده المخزن من الاخر او الموجود على الرف او ثلاجه

        [ForeignKey("UnitNavigation")]
        public int UnitId{ get; set;}
        public virtual Unit UnitNavigation{get; set;}
        public virtual IEnumerable<BillItem> BillItem {get; set; }
    }
}