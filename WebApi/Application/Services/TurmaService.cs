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
    public class TurmaService : ITurmaService
    {
        private readonly ITurmaRepository _turmaRepository;

        public TurmaService(ITurmaRepository turmaRepository)
        {
            _turmaRepository = turmaRepository;
        }

        public async Task<List<TurmaDto>> GetAllTurmas()
        {
            return await _turmaRepository.GetAllAsync();
        }

        public async Task<TurmaDto> GetTurmaById(int id)
        {
            return await _turmaRepository.GetByIdAsync(id);
        }

        public async Task AddTurma(TurmaDto turma)
        {
            await _turmaRepository.AddAsync(turma);
        }

        public async Task UpdateTurma(TurmaDto turma)
        {
            await _turmaRepository.UpdateAsync(turma);
        }

        public async Task DeleteTurma(int id)
        {
            await _turmaRepository.DeleteAsync(id);
        }
    }
}
