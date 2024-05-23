using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Data;
using Domain.Entities;
using Application.IServices;
using Domain.DTOs;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private readonly IAlunoService _alunoService;

        public AlunoController(IAlunoService alunoService)
        {
            _alunoService = alunoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aluno>>> GetAllAlunos()
        {
            var Turmas = await _alunoService.GetAllAlunos();
            return Ok(Turmas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Aluno>> GetAlunoById(int id)
        {
            var aluno = await _alunoService.GetAlunoById(id);
            if (aluno == null)
                return NotFound();
            return Ok(aluno);
        }

        [HttpPost]
        public async Task<ActionResult<Aluno>> AddAluno(AlunoDto aluno)
        {
            await _alunoService.AddAluno(aluno);
            return CreatedAtAction(nameof(GetAlunoById), new { id = aluno.Id }, aluno);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAluno(int id, AlunoDto aluno)
        {
            if (id != aluno.Id)
                return BadRequest();

            await _alunoService.UpdateAluno(aluno);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAluno(int id)
        {
            await _alunoService.DeleteAluno(id);
            return NoContent();
        }
    }
}
