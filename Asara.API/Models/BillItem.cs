using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class BillItem
    {
        [Key]
        public int Id{get; set;}
        public double Price{get; set;}

        public double Quentity{get; set;}
        
        [ForeignKey("ItemNavigation")]
        public int ItemId{get; set;}

        public virtual Item ItemNavigation{get; set;}
        [ForeignKey("BillNavigation")]
        public int BillId{get; set;}

        public virtual Bill BillNavigation{get; set;}

    }
}