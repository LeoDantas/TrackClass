using Domain.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ITurmaAlunoService
    {
        Task<List<TurmaAlunoDto>> GetAllTurmaAluno();
        Task<TurmaAlunoDto> GetTurmaAlunoById(int id);
        Task AddTurmaAluno(TurmaAlunoDto turmaAluno);
        Task UpdateTurmaAluno(TurmaAlunoDto turmaAluno);
        Task DeleteTurmaAluno(int id);
        Task<List<SearchTurmaByAlunoDto>> SearchByAlunoIdAsync(int alunoId);
        Task<ActionResult<bool>> ExisteTurmaAluno(int alunoId, int turmaId);
        Task<ActionResult<bool>> ExisteAlunoVinculado(int alunoId);
        Task<ActionResult<bool>> ExisteTurmaVinculada(int turmaId);
        

    }
}
