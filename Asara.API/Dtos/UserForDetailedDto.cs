using System;
using System.Collections.Generic;

namespace Asara.API.Dtos
{
    public class UserForDetailedDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public string City { get; set; }
        public string Telephone { get; set; }
        public double Money {get; set;}
    }
}