﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Dtos
{
    public class UserDto
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public bool IsAdmin { get; set; }
        public int PriorityStatus { get; set; }
    }
}
