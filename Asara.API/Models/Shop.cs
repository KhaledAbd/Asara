using System.ComponentModel.DataAnnotations;

namespace Asara.API.Models
{
    public class Shop
    {
        [Key]
        public int Id {get; set;}

        public string Name {get; set;}

        public string Address {get; set;}

        public string Telephone {get; set;}

        public string Title {get; set;}
    }
}