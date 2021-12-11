using Asara.API.Models;

namespace Asara.API.Dtos
{
    public class StockItemDetails
    {
        public int Id {get; set;}

        public  ItemForJson ItemNavigation{get; set;}
        public double Quentity {get; set;} 
    }
}