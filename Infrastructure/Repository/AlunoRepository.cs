using Domain.Entities;
using Infrastructure.IRepositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.DTOs;

namespace Infrastructure.Repository
{
    public class AlunoRepository : IAlunoRepository
    {
        private readonly AppDbContext _dbContext;

        public AlunoRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AlunoDto> GetByIdAsync(int id)
        {
            return await _dbContext.Aluno.FindAsync(id);
        }

        public async Task<List<AlunoDto>> GetAllAsync()
        {
            return await _dbContext.Aluno.ToListAsync();
        }

        public async Task AddAsync(AlunoDto aluno)
        {
            _dbContext.Aluno.Add(aluno);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(AlunoDto aluno)
        {
            _dbContext.Aluno.Update(aluno);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var aluno = await GetByIdAsync(id);
            if (aluno != null)
            {
                _dbContext.Aluno.Remove(aluno);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
