using System;

namespace Asara.API.Dtos
{
    public class BillWorkerDtos
    {
        public DateTime DateOfStockBill {get; set;}

        public int BillStockType {get; set;}

        public string Worker{get; set;}
    }
}