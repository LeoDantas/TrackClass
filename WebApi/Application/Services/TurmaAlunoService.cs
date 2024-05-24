using Application.IServices;
using Domain.DTOs;
using Domain.Entities;
using Infrastructure.IRepositories;
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

        public async Task<List<TurmaAlunoDto>> GetAllTurmaAluno()
        {
            return await _turmaAlunoRepository.GetAllAsync();
        }

        public async Task<TurmaAlunoDto> GetTurmaAlunoById(int id)
        {
            return await _turmaAlunoRepository.GetByIdAsync(id);
        }

        public async Task AddTurmaAluno(TurmaAlunoDto turmaAluno)
        {
            await _turmaAlunoRepository.AddAsync(turmaAluno);
        }

        public async Task UpdateTurmaAluno(TurmaAlunoDto turmaAluno)
        {
            await _turmaAlunoRepository.UpdateAsync(turmaAluno);
        }

        public async Task DeleteTurmaAluno(int id)
        {
            await _turmaAlunoRepository.DeleteAsync(id);
        }
    }
}
