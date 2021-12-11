using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class Bill
    {
        [Key]
        public int Id {get; set;}

        [ForeignKey("UserNavigation")]
        public int UserId{get; set;}

        public virtual User UserNavigation{get; set;}

        public double Cost {get; set;}

        public string ClientName {get; set;}
        
        public int Type {get; set;}

        public DateTime CreatedAt{get; set;}

        public double Paid{get; set;}
        [NotMapped]
        public virtual IEnumerable<Expenses> Expenseses {get; set;}

        public virtual IEnumerable<BillItem> BillItems {get; set;}
    }
}