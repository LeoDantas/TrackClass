using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface ITurmaAlunoRepository
    {
        Task<TurmaAluno> GetByIdAsync(int id);
        Task<List<TurmaAluno>> GetAllAsync();
        Task AddAsync(TurmaAluno turmaAluno);
        Task UpdateAsync(TurmaAluno turmaAluno);
        Task DeleteAsync(int id);
    }
}
