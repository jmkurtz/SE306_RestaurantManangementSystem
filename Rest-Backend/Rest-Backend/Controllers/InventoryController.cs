using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Rest_Backend.Dtos;
using Rest_Backend.Entities;
using Rest_Backend.Helpers;
using Rest_Backend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Rest_Backend.Controllers
{
    [Route("api/inventory")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private IInventoryRepository _inventoryRepo;
        private IMapper _mapper;

        public InventoryController(
            IInventoryRepository inventoryRepo,
            IMapper mapper)
        {
            _inventoryRepo = inventoryRepo;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult AddUpdateItem([FromBody] InventoryDto inventoryDto)
        {
            var inventory = _mapper.Map<Inventory>(inventoryDto);

            try
            {
                if(inventory.Id == null)
                {
                    _inventoryRepo.Create(inventory);
                    return Ok();
                }
                else
                {
                    _inventoryRepo.Update(inventory);
                    return Ok();
                }            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var inventory = _inventoryRepo.GetAll();
            var inventoryDto = _mapper.Map<IList<InventoryDto>>(inventory);
            return Ok(inventoryDto);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var inventory = _inventoryRepo.GetById(id);
            var inventoryDto = _mapper.Map<InventoryDto>(inventory);
            return Ok(inventoryDto);
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _inventoryRepo.Delete(id);
            return Ok();
        }
    }
}
