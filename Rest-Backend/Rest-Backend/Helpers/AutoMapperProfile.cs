using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Rest_Backend.Dtos;
using Rest_Backend.Entities;
using AutoMapper;

namespace Rest_Backend.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Reservation, ReservationDto>();
            CreateMap<ReservationDto, Reservation>();
        }
    }
}
