using System;
using System.Collections.Generic;

namespace Asara.API.Dtos
{
    public class Barren{
        public DateTime BarrenDate {get; set;}

        public List<BarrenItem> BarrenItems {get; set;}  
    }
    public class BarrenItem
    {
        public ItemForJson  Item {get; set;}

        public List<PriceItem> PriceItems {get; set;}
    }
    public class PriceItem{

        public int Type{get; set;}
        public double Price {get; set;}

        public double Quentity {get; set;}
    }
}