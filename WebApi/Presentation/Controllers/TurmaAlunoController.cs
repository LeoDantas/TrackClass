using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Domain.Entities;
using Application.IServices;
using Domain.DTOs;
using Application.Services;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Reflection.Metadata;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurmaAlunoController : ControllerBase
    {
        private readonly ITurmaAlunoService _turmaAlunoService;

        public TurmaAlunoController(ITurmaAlunoService turmaAlunoService)
        {
            _turmaAlunoService = turmaAlunoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Turma>>> GetAllTurmaAluno()
        {
            var Turmas = await _turmaAlunoService.GetAllTurmaAluno();
            return Ok(Turmas);
        }

        [HttpGet("getAllTurmaAlunoNome")]
        public async Task<ActionResult<IEnumerable<TurmaAlunoNomeDto>>> GetAllTurmaAlunoNome()
        {
            var Turmas = await _turmaAlunoService.GetAllTurmaAlunoNome();
            return Ok(Turmas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Turma>> GetTurmaAlunoById(int id)
        {
            var Turma = await _turmaAlunoService.GetTurmaAlunoById(id);
            if (Turma == null)
                return NotFound();
            return Ok(Turma);
        }

        [HttpPost]
        public async Task<ActionResult<Turma>> AddTurmaAluno(TurmaAlunoDto turmaAluno)
        {
            await _turmaAlunoService.AddTurmaAluno(turmaAluno);
            return CreatedAtAction(nameof(GetTurmaAlunoById), new { id = turmaAluno.Id }, turmaAluno);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTurmaAluno(int id, TurmaAlunoDto turmaAluno)
        {
            if (id != turmaAluno.Id)
                return BadRequest();

            await _turmaAlunoService.UpdateTurmaAluno(turmaAluno);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTurmaAluno(int id)
        {
            await _turmaAlunoService.DeleteTurmaAluno(id);
            return NoContent();
        }

        [HttpGet("searchByAlunoId")]
        public async Task<ActionResult<SearchTurmaByAlunoDto>> SearchByAlunoId(int alunoId)
        {
            var TurmasPorAluno =  _turmaAlunoService.SearchByAlunoIdAsync(alunoId);

            if (TurmasPorAluno == null)
                return NotFound();
            return Ok(TurmasPorAluno);
        }

        [HttpGet("existeTurmaAluno")]
        public async Task<ActionResult<bool>> ExisteTurmaAluno(int alunoId, int turmaId)
        {
            var TurmasPorAluno = _turmaAlunoService.ExisteTurmaAluno(alunoId, turmaId);

            if (TurmasPorAluno == null)
                return NotFound();
            return Ok(TurmasPorAluno);
        }

        [HttpGet("existeAlunoVinculado")]
        public async Task<ActionResult<bool>> ExisteAlunoVinculado(int alunoId)
        {
            var TurmasPorAluno = _turmaAlunoService.ExisteAlunoVinculado(alunoId);

            if (TurmasPorAluno == null)
                return NotFound();
            return Ok(TurmasPorAluno);
        }

        [HttpGet("existeTurmaVinculada")]
        public async Task<ActionResult<bool>> ExisteTurmaVinculada(int turmaId)
        {
            var TurmasPorAluno = _turmaAlunoService.ExisteTurmaVinculada(turmaId);

            if (TurmasPorAluno == null)
                return NotFound();
            return Ok(TurmasPorAluno);
        }

    }
}
