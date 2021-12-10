using System;

namespace Asara.API.Dtos
{
    public class ExtraExpensesFromDtos
    {

        public string Reason{get; set;}

        public double Paid{get; set;}

        public DateTime CreatedAt{get; set;}
        
        public int UserId{get; set;}
    }
}