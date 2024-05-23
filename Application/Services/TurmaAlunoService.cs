using Application.IServices;
using Domain.Entities;
using Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class TurmaAlunoService : ITurmaAlunoService
    {
        private readonly ITurmaAlunoRepository _turmaAlunoRepository;

        public TurmaAlunoService(ITurmaAlunoRepository turmaAlunoRepository)
        {
            _turmaAlunoRepository = turmaAlunoRepository;
        }

        public async Task<List<TurmaAluno>> GetAllTurmaAluno()
        {
            return await _turmaAlunoRepository.GetAllAsync();
        }

        public async Task<TurmaAluno> GetTurmaAlunoById(int id)
        {
            return await _turmaAlunoRepository.GetByIdAsync(id);
        }

        public async Task AddTurmaAluno(TurmaAluno turmaAluno)
        {
            await _turmaAlunoRepository.AddAsync(turmaAluno);
        }

        public async Task UpdateTurmaAluno(TurmaAluno turmaAluno)
        {
            await _turmaAlunoRepository.UpdateAsync(turmaAluno);
        }

        public async Task DeleteTurmaAluno(int id)
        {
            await _turmaAlunoRepository.DeleteAsync(id);
        }
    }
}
