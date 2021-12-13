using System;

namespace Asara.API.Dtos
{
    public class StockBillDetailsDtos
    {
        public double Quentity{get; set;}
        
        public string ItemName{get; set;}

        public string EmployeeName{get; set;}

        public int Type {get; set;}

        public DateTime CreatedAt{get; set;}

        public string Worker{get; set;}

    }
}