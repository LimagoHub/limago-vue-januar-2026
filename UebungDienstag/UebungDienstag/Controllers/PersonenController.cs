using Microsoft.AspNetCore.Mvc;
using System;
using UebungDienstag.service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace UebungDienstag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonenController : ControllerBase
    {

        private static readonly PersonHolder holder= new PersonHolder();
        // GET: api/<PersonenController>
        [HttpGet]
        public IEnumerable<Person> Get()
        {
            return holder.FindAll();
        }

        // GET api/<PersonenController>/5
        [HttpGet("{id:guid}")]
        public IActionResult GetById(Guid id)
        {
            Person? person = holder.FindById(id);

            if (person is null)
                return NotFound();

            return Ok(person);
        }

        [HttpPut("{id:guid}")]
        public IActionResult Update(Guid id, [FromBody] Person person)
        {
            if (id != person.Id)
                return BadRequest(new { message = "Id in URL und Body stimmen nicht überein." });

            bool updated = holder.Update(person);

            if (!updated)
                return NotFound();

            return Ok(person);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Person person)
        {
            bool inserted = holder.Insert(person);

            if (!inserted)
                return Conflict(new { message = "Person mit dieser Id existiert bereits." });

            return CreatedAtAction(
                nameof(GetById),
                new { id = person.Id },
                person
            );
        }

        [HttpDelete("{id:guid}")]

        public IActionResult Delete(Guid id)
        {
            bool deleted = holder.Delete(id);

            if (!deleted)
                return NotFound();

            return Ok();
        }





    }
}
