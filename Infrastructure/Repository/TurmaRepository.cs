
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
    public class TurmaRepository : ITurmaRepository
    {
        private readonly AppDbContext _dbContext;

        public TurmaRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Turma> GetByIdAsync(int id)
        {
            return await _dbContext.Turma.FindAsync(id);
        }

        public async Task<List<Turma>> GetAllAsync()
        {
            return await _dbContext.Turma.ToListAsync();
        }

        public async Task AddAsync(Turma turma)
        {
            _dbContext.Turma.Add(turma);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Turma turma)
        {
            _dbContext.Turma.Update(turma);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var turma = await GetByIdAsync(id);
            if (turma != null)
            {
                _dbContext.Turma.Remove(turma);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
