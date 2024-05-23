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
        Task<List<TurmaAluno>> GetAllTurmaAluno();
        Task<TurmaAluno> GetTurmaAlunoById(int id);
        Task AddTurmaAluno(TurmaAluno turmaAluno);
        Task UpdateTurmaAluno(TurmaAluno turmaAluno);
        Task DeleteTurmaAluno(int id);
    }
}
