using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Infrastructure.Data;
using Application.IServices;
using Domain.DTOs;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurmaController : ControllerBase
    {
        private readonly ITurmaService _turmaService;

        public TurmaController(ITurmaService turmaService)
        {
            _turmaService = turmaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Turma>>> GetAllTurmas()
        {
            var Turmas = await _turmaService.GetAllTurmas();
            return Ok(Turmas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Turma>> GetTurmaById(int id)
        {
            var Turma = await _turmaService.GetTurmaById(id);
            if (Turma == null)
                return NotFound();
            return Ok(Turma);
        }

        [HttpPost]
        public async Task<ActionResult<Turma>> AddTurma(TurmaDto Turma)
        {
            await _turmaService.AddTurma(Turma);
            return CreatedAtAction(nameof(GetTurmaById), new { id = Turma.Id }, Turma);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTurma(int id, TurmaDto Turma)
        {
            if (id != Turma.Id)
                return BadRequest();

            await _turmaService.UpdateTurma(Turma);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTurma(int id)
        {
            await _turmaService.DeleteTurma(id);
            return NoContent();
        }
    }
}
