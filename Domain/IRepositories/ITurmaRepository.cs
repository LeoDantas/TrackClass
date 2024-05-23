using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.IRepositories
{
    public interface ITurmaRepository
    {
        Task<Turma> GetByIdAsync(int id);
        Task<List<Turma>> GetAllAsync();
        Task AddAsync(Turma turma);
        Task UpdateAsync(Turma turma);
        Task DeleteAsync(int id);
    }
}
