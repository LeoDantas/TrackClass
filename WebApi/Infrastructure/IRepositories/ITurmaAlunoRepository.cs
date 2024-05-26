using Domain.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.IRepositories
{
    public interface ITurmaAlunoRepository
    {
        Task<TurmaAlunoDto> GetByIdAsync(int id);
        Task<List<TurmaAlunoDto>> GetAllAsync();
        Task AddAsync(TurmaAlunoDto turmaAluno);
        Task UpdateAsync(TurmaAlunoDto turmaAluno);
        Task DeleteAsync(int id);
        Task<List<SearchTurmaByAlunoDto>> SearchByAlunoIdAsync(int alunoId);
        Task<ActionResult<bool>> ExisteTurmaAluno(int alunoId, int turmaId);
        Task<ActionResult<bool>> ExisteAlunoVinculado(int alunoId);
        Task<ActionResult<bool>> ExisteTurmaVinculada(int turmaId);
    }
}
