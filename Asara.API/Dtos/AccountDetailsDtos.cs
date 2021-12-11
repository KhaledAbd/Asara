using System;

namespace Asara.API.Dtos
{
    public class AccountDetailsDtos
    {
        public int Id {get; set;}

        public double Money {get; set;}

        public double LastUserMoney {get; set;}
        public DateTime CreatedAt{get; set;}
        
        public bool IsIntial {get; set;}

        public UserForJson UserNavigation{get; set;} 
   }
}
