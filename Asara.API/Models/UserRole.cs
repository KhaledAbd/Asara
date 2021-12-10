using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Asara.API.Models
{
    public class UserRole:IdentityUserRole<int>
    {
        public virtual User User {get; set;}

        public virtual Role Role {get; set;}
    }
}