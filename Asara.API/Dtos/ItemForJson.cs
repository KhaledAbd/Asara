using Asara.API.Models;

namespace Asara.API.Dtos
{
    public class ItemForJson
    {
        public int Id {get; set;}   
        public string Name{get; set;}
        public Unit UnitNavigation{get; set;}
        
    }
}