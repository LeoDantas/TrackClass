using Domain.DTOs;
using Domain.Entities;
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
    }
}
