using System;
using System.ComponentModel.DataAnnotations;

namespace Asara.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(20,MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 20 characters")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Telephone { get; set; }
        public DateTime Created { get; set; }
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
        }
    }
}