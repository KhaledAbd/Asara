using System;

namespace Asara.API.Dtos
{
    public class BillClientsDts
    {
        public DateTime DateOfBill {get; set;}

        public int BillType {get; set;}

        public string ClientName{get; set;}
    }
}