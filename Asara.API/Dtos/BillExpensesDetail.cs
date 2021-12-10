using System;

namespace Asara.API.Dtos
{
    public class BillExpensesDetail
    {
        public int Id {get; set;}

        public UserForJson UserNavigation{get; set;}

        public double Cost {get; set;}

        public double Paid {get; set;}
        public string ClientName {get; set;}

        public DateTime CreatedAt{get; set;}

        public int Type{get; set;}
    }
}