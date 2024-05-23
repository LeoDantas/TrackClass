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
    public class TurmaService : ITurmaService
    {
        private readonly ITurmaRepository _turmaRepository;

        public TurmaService(ITurmaRepository turmaRepository)
        {
            _turmaRepository = turmaRepository;
        }

        public async Task<List<Turma>> GetAllTurmas()
        {
            return await _turmaRepository.GetAllAsync();
        }

        public async Task<Turma> GetTurmaById(int id)
        {
            return await _turmaRepository.GetByIdAsync(id);
        }

        public async Task AddTurma(Turma turma)
        {
            await _turmaRepository.AddAsync(turma);
        }

        public async Task UpdateTurma(Turma turma)
        {
            await _turmaRepository.UpdateAsync(turma);
        }

        public async Task DeleteTurma(int id)
        {
            await _turmaRepository.DeleteAsync(id);
        }
    }
}
