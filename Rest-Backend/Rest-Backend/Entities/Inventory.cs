using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Entities
{
    public class Inventory
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string ItemName { get; set; }
        public int ItemQuantity { get; set; }
        public int ItemMaxQuantity { get; set; }
        public int ItemMinQuantity { get; set; }
        public double ItemPrice { get; set; }
    }
}
