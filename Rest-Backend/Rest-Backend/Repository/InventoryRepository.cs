using Rest_Backend.Dtos;
using Rest_Backend.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Repository
{
    public interface IInventoryRepository
    {
        Inventory Create(Inventory item);
        Inventory GetById(string id);
        IEnumerable<Inventory> GetAll();
        void Update(Inventory item);
        void Delete(string id);
    }
    public class InventoryRepository : IInventoryRepository
    {
        private DatabaseContext _context;

        public InventoryRepository(DatabaseContext context)
        {
            _context = context;
        }

        public Inventory Create(Inventory item)
        {
            int zero = 0;
            if (!_context.InventoryItems.Any())
                item.Id = zero.ToString();
            else
                item.Id = (Int32.Parse(_context.InventoryItems.Last<Inventory>().Id) + 1).ToString();
            _context.InventoryItems.Add(item);
            _context.SaveChanges();
            return item;
        }

        public void Update(Inventory updatedItem)
        {
            var item = _context.InventoryItems.Find(updatedItem.Id);

            item.ItemQuantity = updatedItem.ItemQuantity;
            item.ItemPrice = updatedItem.ItemPrice;

            _context.InventoryItems.Update(item);
            _context.SaveChanges();
        }

        public Inventory GetById(string id)
        {
            return _context.InventoryItems.Find(id);
        }

        public IEnumerable<Inventory> GetAll()
        {
            return _context.InventoryItems;
        }

        public void Delete(string id)
        {
            var inventory = _context.InventoryItems.Find(id);
            if(inventory != null)
            {
                _context.InventoryItems.Remove(inventory);
                _context.SaveChanges();
            }
        }
    }
}
