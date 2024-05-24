using Domain.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.IRepositories
{
    public interface IAlunoRepository
    {
        Task<AlunoDto> GetByIdAsync(int id);
        Task<List<AlunoDto>> GetAllAsync();
        Task AddAsync(AlunoDto aluno);
        Task UpdateAsync(AlunoDto aluno);
        Task DeleteAsync(int id);
    }
}
