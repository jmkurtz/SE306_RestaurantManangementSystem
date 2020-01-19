using Rest_Backend.Entities;
using Rest_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Services
{
    public class ReservationService
    {
        public int BRONZE_MAX = 200;
        public int SILVER_MAX = 400;
        public int MAX_CAP = 400;
        public int TIME_BLOCK = 60;

        public bool reservationAvailablity(IReservationRepository list, Reservation item)
        {
            int cap = 0;
            foreach(var ticket in list.GetAll())
            {
                if(item.ReservationDate == ticket.ReservationDate)
                {
                    int diff = CompareTime(item.ReservationTime, ticket.ReservationTime);
                    if(diff < TIME_BLOCK)
                    {
                        cap += ticket.TableSize;
                    }
                }
            }

            cap += item.TableSize;

            if (cap > MAX_CAP)
                return false;
            else
                return true;
        }

        public string currentStatus(int status)
        {
            if (status == 0)
                return "New Customer";
            else if (status < BRONZE_MAX)
                return "Bronze";
            else if (status < SILVER_MAX)
                return "Silver";
            else if (status >= SILVER_MAX)
                return "Gold";
            else
                return "Bad Customer";
        }

        public int priorityStatus(int old, string arrival, string scheduled, string leave, string spent)
        {
            int newPriority = old + 5; //Five points for showing up
            newPriority += (int)(timeSpent(arrival, scheduled)) * 2; //Showing up early really helps, showing up late really hurts.
            newPriority += (int)(timeSpent(arrival, leave) * 0.5); //Half a point for each minute
            newPriority += (int)Convert.ToDouble(spent) + 1; //Point for every dollar spent rounded up
            return newPriority;
        }

        public int timeSpent(string arrival, string leave)
        {
            int timeSpent = 0;

            string[] parsedArrival = arrival.Split(' ');
            string[] parsedLeave = leave.Split(' ');

            string[] parsedArrivalTime = parsedArrival[1].Split(':');
            string[] parsedLeaveTime = parsedLeave[1].Split(':');

            int arrivalHour = Int32.Parse(parsedArrivalTime[0]);
            int arrivalMin = Int32.Parse(parsedArrivalTime[1]);

            int leaveHour = Int32.Parse(parsedLeaveTime[0]);
            int leaveMin = Int32.Parse(parsedLeaveTime[1]);

            if (parsedArrival[2] == "PM")
            {
                if (arrivalHour != 12)
                    arrivalHour += 12;
            }
            if (parsedLeave[2] == "PM")
            {
                if (leaveHour != 12)
                    leaveHour += 12;
            }

            if (leaveHour == arrivalHour) //Same Hour
            {
                timeSpent += (leaveMin - arrivalMin);
                return timeSpent;
            }
            else
            {
                timeSpent += (leaveHour - arrivalHour) * 60;
                timeSpent += 60 - arrivalMin;
                for (int i = 1; i < leaveHour - arrivalHour; i++)
                    timeSpent += 60;
                timeSpent += leaveMin;
                return timeSpent;
            }
        }

        public int CompareTime(string time1, string time2)
        {
             return Math.Abs(timeSpent(time1, time2));
        }
    }
}
