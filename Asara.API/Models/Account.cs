using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Asara.API.Models
{
    public class Account
    {
        [Key]
        public int Id {get; set;}

        public double Money {get; set;}

        public double LastUserMoney {get; set;}
        public DateTime CreatedAt{get; set;}

        public bool IsIntial {get; set;}
        [ForeignKey("UserNavigation")]
        public int UserId {get; set;}

        public virtual User UserNavigation {get; set;}
    }
}