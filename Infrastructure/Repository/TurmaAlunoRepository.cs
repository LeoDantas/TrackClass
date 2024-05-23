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
    public class TurmaAlunoRepository : ITurmaAlunoRepository
    {
        private readonly AppDbContext _dbContext;

        public TurmaAlunoRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TurmaAlunoDto> GetByIdAsync(int id)
        {
            return await _dbContext.TurmaAluno.FindAsync(id);
        }

        public async Task<List<TurmaAlunoDto>> GetAllAsync()
        {
            return await _dbContext.TurmaAluno.ToListAsync();
        }

        public async Task AddAsync(TurmaAlunoDto turmaAluno)
        {
            _dbContext.TurmaAluno.Add(turmaAluno);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(TurmaAlunoDto turmaAluno)
        {
            _dbContext.TurmaAluno.Update(turmaAluno);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var turmaAluno = await GetByIdAsync(id);
            if (turmaAluno != null)
            {
                _dbContext.TurmaAluno.Remove(turmaAluno);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
