using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rest_Backend.Dtos;
using Rest_Backend.Entities;
using Rest_Backend.Repository;
using Rest_Backend.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepo;
        private readonly IUserService _userRepo;
        private IMapper _mapper;

        public ReservationController(
            IReservationRepository reservationRepo,
            IUserService userRepo,
            IMapper mapper)
        {
            _reservationRepo = reservationRepo;
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddReservationTicket([FromBody] ReservationDto reservationDto)
        {
            var reservation = _mapper.Map<Reservation>(reservationDto);
            var service = new ReservationService();

            try
            {
                if(reservation.Id == null)
                {
                    if (service.reservationAvailablity(_reservationRepo, reservation))
                        _reservationRepo.Create(reservation);
                    else
                        return BadRequest(new { message = "Reservation at Max Capacity!" });
                    return Ok();
                }
                else
                {
                    _reservationRepo.Update(reservation);
                    return Ok();
                }
            }
            catch(ApplicationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var reservation = _reservationRepo.GetAll();
            var reservationDto = _mapper.Map<IList<ReservationDto>>(reservation);
            return Ok(reservationDto);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var reservation = _reservationRepo.GetById(id);
            var reservationDto = _mapper.Map<ReservationDto>(reservation);
            return Ok(reservationDto);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _reservationRepo.Delete(id);
            return Ok();
        }

        [HttpPost("checkin")]
        public IActionResult CheckIn([FromBody] ReservationDto reservationDto)
        {
            DateTime time = DateTime.Now;
            var reservation = _mapper.Map<Reservation>(reservationDto);

            reservation.ArrivalTime = time.ToString();
            _reservationRepo.Update(reservation);

            return Ok();
        }

        [HttpPost("checkout")]
        public IActionResult CheckOut([FromBody] ReservationDto reservationDto)
        {
            DateTime time = DateTime.Now;
            var updateUser = new User();
            var service = new ReservationService();

            var reservation = _mapper.Map<Reservation>(reservationDto);

            reservation.LeaveTime = time.ToString();

            updateUser = _userRepo.GetById(reservation.UserId);
            if(updateUser != null)
            {
                updateUser.PriorityStatus += service.priorityStatus(updateUser.PriorityStatus, reservation.ArrivalTime, reservation.ReservationTime, reservation.LeaveTime, reservation.AmountSpent);
                _userRepo.Update(updateUser);
            }
            _reservationRepo.Delete(reservation.Id);

            return Ok();
        }
    }
}
