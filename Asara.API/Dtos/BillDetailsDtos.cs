using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Asara.API.Models;

namespace Asara.API.Dtos
{
    public class BillDetailsDtos
    {
        public int Id {get; set;}

        public virtual UserForJson UserNavigation{get; set;}

        public virtual IEnumerable<BillItemDetails> BillItems {get; set;}

        public double Cost {get; set;}

        public double Paid {get; set;}
        public string ClientName {get; set;}

        public DateTime CreatedAt{get; set;}

        public int Type{get; set;}
    }
}