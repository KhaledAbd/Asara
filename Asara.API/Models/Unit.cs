using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Asara.API.Models
{
    public class Unit
    {
        [Key]
        public int Id{get; set;}

        public string Name{get; set;}
        [JsonIgnore]
        public virtual ICollection<Item> items {get; set;}
    }
}