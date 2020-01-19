using Rest_Backend.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Repository
{
    public interface IUserRepository
    {
        UserDto Add(UserDto items);
        UserDto Get(string items);
        Dictionary<string, UserDto> GetAll();
    }
    public class UserRepository : IUserRepository
    {
        private readonly Dictionary<string, UserDto> _userData;

        public UserRepository()
        {
            _userData = new Dictionary<string, UserDto>();
        }

        public UserDto Add(UserDto items)
        {
            Guid id = Guid.NewGuid();
            //items.UserId = id.ToString();
            //_userData.Add(items.Id, items);
            return items;
        }

        public UserDto Get(string item)
        {
            UserDto invItem;
            if (!_userData.TryGetValue(item, out invItem))
            {
                return null;
            }

            return _userData[item];
        }

        public Dictionary<string, UserDto> GetAll()
        {
            return _userData;
        }
    }
}
