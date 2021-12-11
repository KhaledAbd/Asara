using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class Expenses
    {
        [Key]
        public int Id{get; set;}

        public string Reason{get; set;}

        public double Paid{get; set;}

        public DateTime CreatedAt{get; set;}
        [ForeignKey("BillNavigation")]
        public int BillId{get; set;}

        public virtual Bill BillNavigation{get; set;}

        [ForeignKey("UserNavigation")]
        public int UserId{get; set;}

        public virtual User UserNavigation{get; set;}


    }
}