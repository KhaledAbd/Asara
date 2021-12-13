using System;
using System.Collections.Generic;
using Asara.API.Models;

namespace Asara.API.Dtos
{
    public class BillFromDtos
    {
        public int UserId{get; set;}
        public virtual IEnumerable<BillItemDtos> BillItems {get; set;}
        public double Cost {get; set;}
        public double Paid{get; set;}
        public string ClientName {get; set;}
        public int Type {get; set;}
        public DateTime CreatedAt{get; set;}

        public double Discount {get; set;}
    }
}