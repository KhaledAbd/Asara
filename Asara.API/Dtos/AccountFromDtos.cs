using System;

namespace Asara.API.Dtos
{
    public class AccountFromDtos
    {
        
        public double Money {get; set;}
        public DateTime CreatedAt{get; set;}
        public int UserId {get; set;}
        public bool IsIntial{get; set;}
        public double LastUserMoney {get; set;}


    }
}