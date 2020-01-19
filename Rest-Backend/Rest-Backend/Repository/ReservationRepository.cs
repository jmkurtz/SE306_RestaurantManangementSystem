using Rest_Backend.Dtos;
using Rest_Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Repository
{
    public interface IReservationRepository
    {
        Reservation Create(Reservation tickets);
        Reservation GetById(string id);
        IEnumerable<Reservation> GetAll();
        void Update(Reservation ticket);
        void Delete(string id);
    }
    public class ReservationRepository : IReservationRepository
    {
        private DatabaseContext _context;

        public ReservationRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Reservation Create(Reservation ticket)
        {
            int one = 1;
            if (!_context.ReservationTable.Any())
                ticket.Id = one.ToString();
            else
                ticket.Id = (Int32.Parse(_context.ReservationTable.Last<Reservation>().Id) + 1).ToString();

            _context.ReservationTable.Add(ticket);
            _context.SaveChanges();
            return ticket;
        }

        public void Update(Reservation updatedTicket)
        {
            var ticket = _context.ReservationTable.Find(updatedTicket.Id);

            ticket.ReservationTime = updatedTicket.ReservationTime;
            ticket.TableSize = updatedTicket.TableSize;

            _context.ReservationTable.Update(ticket);
            _context.SaveChanges();
        }

        public Reservation GetById(string id)
        {
            return _context.ReservationTable.Find(id);
        }

        public IEnumerable<Reservation> GetAll()
        {
            return _context.ReservationTable;
        }

        public void Delete(string id)
        {
            var reservation = _context.ReservationTable.Find(id);
            if(reservation != null)
            {
                _context.ReservationTable.Remove(reservation);
                _context.SaveChanges();
            }
        }
    }
}
