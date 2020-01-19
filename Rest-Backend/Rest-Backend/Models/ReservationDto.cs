using Rest_Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Dtos
{
    public class ReservationDto
    {
        public string Id { get; set; }
        public string ReservationTime { get; set; }
        public string ReservationDate { get; set; }
        public int TableSize { get; set; }
        public string UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserEmail { get; set; }
        public string UserPriorityStatus { get; set; }
        public string AmountSpent { get; set; }
        public bool isCheckedIn { get; set; }
    }
}
