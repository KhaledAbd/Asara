using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Asara.API.Models
{
    public class User: IdentityUser<int>
    {
        public string Gender {get; set;}

        public DateTime DateOfBirth {get; set;}

        public string KnownAs { get; set; }
        
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Telephone { get; set; }
        public double Money {get; set;}
        public virtual ICollection<Account> Account {get; set;} 
        public virtual ICollection<UserRole> UserRoles { get; set; }
        [NotMapped]
        public virtual IEnumerable<Expenses> Expenseses {get; set;}

    }
}