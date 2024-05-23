using Domain.Entities;
using Domain.IRepositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repository
{
    public class TurmaAlunoRepository : ITurmaAlunoRepository
    {
        private readonly AppDbContext _dbContext;

        public TurmaAlunoRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<TurmaAluno> GetByIdAsync(int id)
        {
            return await _dbContext.TurmaAluno.FindAsync(id);
        }

        public async Task<List<TurmaAluno>> GetAllAsync()
        {
            return await _dbContext.TurmaAluno.ToListAsync();
        }

        public async Task AddAsync(TurmaAluno turmaAluno)
        {
            _dbContext.TurmaAluno.Add(turmaAluno);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(TurmaAluno turmaAluno)
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
