using Domain.DTOs;
using Domain.Entities;
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
    }
}
