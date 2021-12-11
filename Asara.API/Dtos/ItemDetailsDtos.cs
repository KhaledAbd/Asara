using System.Collections.Generic;
using Asara.API.Models;
using Newtonsoft.Json;

namespace Asara.API.Dtos
{
    public class ItemDetailsDtos
    {
        public int Id {get; set;}   
        public string Name{get; set;}
        public double Price{get; set;}
        public double Quentity {get; set;}  ///ده المخزن من الاخر او الموجود على الرف او ثلاجه
        public Unit UnitNavigation{get; set;}
    }
}