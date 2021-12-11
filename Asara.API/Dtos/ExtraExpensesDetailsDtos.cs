using System;

namespace Asara.API.Dtos
{
    public class ExtraExpensesDetailsDtos
    {
        public int Id{get; set;}

        public string Reason{get; set;}

        public double Paid{get; set;}

        public DateTime CreatedAt{get; set;}
        
        public UserForJson UserNavigation{get; set;}
    }
}