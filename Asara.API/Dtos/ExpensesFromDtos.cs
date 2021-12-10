using System;

namespace Asara.API.Dtos
{
    public class ExpensesFromDtos
    {
        
        public string Reason{get; set;}

        public double Paid{get; set;}
        public int BillId{get; set;}

        public int UserId {get; set;}

        public DateTime CreatedAt{get; set;}
    }
}