using Application.IServices;
using Domain.DTOs;
using Domain.Entities;
using Infrastructure.IRepositories;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<List<TurmaAlunoNomeDto>> GetAllTurmaAlunoNome()
        {
            return await _turmaAlunoRepository.GetAllTurmaAlunoNome();
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

        public async Task<List<SearchTurmaByAlunoDto>> SearchByAlunoIdAsync(int turmaId)
        {
            return await _turmaAlunoRepository.SearchByAlunoIdAsync(turmaId);
        }

        public async Task<ActionResult<bool>> ExisteTurmaAluno(int alunoId, int turmaId)
        {
            return await _turmaAlunoRepository.ExisteTurmaAluno(alunoId, turmaId);
        }
        public async Task<ActionResult<bool>> ExisteAlunoVinculado(int alunoId)
        {
            return await _turmaAlunoRepository.ExisteAlunoVinculado(alunoId);
        }
        public async Task<ActionResult<bool>> ExisteTurmaVinculada(int turmaId)
        {
            return await _turmaAlunoRepository.ExisteTurmaVinculada(turmaId);
        }

    }
}
