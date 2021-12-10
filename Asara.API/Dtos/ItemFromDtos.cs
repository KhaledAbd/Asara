using System.ComponentModel.DataAnnotations;
using Asara.API.Models;

namespace Asara.API.Dtos
{
    public class ItemFromDtos
    {
        public string Name{get; set;}
        public double Price{get; set;}
        public int UnitId{ get; set;}
        public int Type{get; set;}
    }
}