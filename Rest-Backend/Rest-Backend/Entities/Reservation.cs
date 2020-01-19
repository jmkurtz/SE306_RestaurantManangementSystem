using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Entities
{
    public class Reservation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string ReservationTime { get; set; }
        public string ReservationDate { get; set; }
        public int TableSize { get; set; }
        public string UserId { get; set; }
        public string UserFirstName { get; set; }
        public string UserEmail { get; set; }
        public string UserPriorityStatus { get; set; }
        public string ArrivalTime { get; set; }
        public string LeaveTime { get; set; }
        public string AmountSpent { get; set; }
    }
}
