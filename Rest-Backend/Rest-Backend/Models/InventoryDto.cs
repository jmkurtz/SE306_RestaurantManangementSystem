using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Dtos
{
    public class InventoryDto
    {
        public string Id { get; set; }
        public string ItemName { get; set; }
        public int ItemQuantity { get; set; }
        public int ItemMaxQuantity { get; set; }
        public int ItemMinQuantity { get; set; }
        public double ItemPrice { get; set; }
    }
}
