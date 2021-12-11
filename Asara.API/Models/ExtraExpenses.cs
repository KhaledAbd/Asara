using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class ExtraExpenses
    {
        [Key]
        public int Id{get; set;}

        public string Reason{get; set;}

        public double Paid{get; set;}

        public DateTime CreatedAt{get; set;}
        
        [ForeignKey("UserNavigation")]
        public int UserId{get; set;}

        public virtual User UserNavigation{get; set;}
    }
}