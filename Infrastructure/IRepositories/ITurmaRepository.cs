using Domain.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.IRepositories
{
    public interface ITurmaRepository
    {
        Task<TurmaDto> GetByIdAsync(int id);
        Task<List<TurmaDto>> GetAllAsync();
        Task AddAsync(TurmaDto turma);
        Task UpdateAsync(TurmaDto turma);
        Task DeleteAsync(int id);
    }
}
