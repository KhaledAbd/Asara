using System;
using System.ComponentModel.DataAnnotations;

namespace Asara.API.Dtos
{
    public class userForUpdateDtos
    {
        public string Username { get; set; }
        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Telephone { get; set; }
        
        public string Folder { get; set; }

    }
}