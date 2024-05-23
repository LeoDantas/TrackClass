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
    public class AlunoRepository : IAlunoRepository
    {
        private readonly AppDbContext _dbContext;

        public AlunoRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Aluno> GetByIdAsync(int id)
        {
            return await _dbContext.Aluno.FindAsync(id);
        }

        public async Task<List<Aluno>> GetAllAsync()
        {
            return await _dbContext.Aluno.ToListAsync();
        }

        public async Task AddAsync(Aluno aluno)
        {
            _dbContext.Aluno.Add(aluno);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Aluno aluno)
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
