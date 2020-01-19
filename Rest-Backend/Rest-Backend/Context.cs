using Microsoft.EntityFrameworkCore;
using Rest_Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Inventory> InventoryItems { get; set; }
        public DbSet<Reservation> ReservationTable { get; set; }
        public DbSet<User> Users { get; set; }
    }

}
