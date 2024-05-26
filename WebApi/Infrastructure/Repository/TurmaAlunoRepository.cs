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
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http.HttpResults;

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

        public async Task<List<TurmaAlunoNomeDto>> GetAllTurmaAlunoNome()
        {
            var turmaAlunos = await (from ta in _dbContext.TurmaAluno
                                     join t in _dbContext.Turma on ta.TurmaId equals t.Id
                                     join a in _dbContext.Aluno on ta.AlunoId equals a.Id
                                     select new TurmaAlunoNomeDto
                                     {
                                         Id = ta.Id,
                                         Ativo = t.Ativo,
                                         NomeAluno = a.Nome,
                                         NomeTurma = t.Nome
                                     }).ToListAsync();

            return turmaAlunos;
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

        public async Task<List<SearchTurmaByAlunoDto>> SearchByAlunoIdAsync(int alunoId)
        {
            var turmaAlunos = await (from ta in _dbContext.TurmaAluno
                                     join t in _dbContext.Turma on ta.TurmaId equals t.Id
                                     where ta.AlunoId == alunoId && ta.Ativo == true
                                     select new SearchTurmaByAlunoDto
                                     {
                                         Id = ta.Id,
                                         Ativo = t.Ativo,
                                         Nome = t.Nome,
                                         Descricao = t.Descricao
                                     }).ToListAsync();

            return turmaAlunos;
        }

        public async Task<ActionResult<bool>> ExisteTurmaAluno(int alunoId, int turmaId)
        {
            bool existe = false;
            var turmaAlunos = await (from ta in _dbContext.TurmaAluno
                                     where ta.AlunoId == alunoId && ta.TurmaId == turmaId
                                     select ta.AlunoId).ToListAsync();

            if(turmaAlunos.Count > 0)
            {
                existe = true;

            }
            return existe;
        }
        public async Task<ActionResult<bool>> ExisteAlunoVinculado(int alunoId)
        {
            bool existe = false;
            var turmaAlunos = await (from ta in _dbContext.TurmaAluno
                                     where ta.AlunoId == alunoId 
                                     select ta.AlunoId).ToListAsync();

            if (turmaAlunos.Count > 0)
            {
                existe = true;

            }
            return existe;
        }
        public async Task<ActionResult<bool>> ExisteTurmaVinculada(int turmaId)
        {
            bool existe = false;
            var turmaAlunos = await (from ta in _dbContext.TurmaAluno
                                     where ta.TurmaId == turmaId
                                     select ta.AlunoId).ToListAsync();

            if (turmaAlunos.Count > 0)
            {
                existe = true;

            }
            return existe;
        }
    }
}
