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

    public class AlunoService : IAlunoService
    {
        private readonly IAlunoRepository _alunoRepository;

        public AlunoService(IAlunoRepository alunoRepository)
        {
            _alunoRepository = alunoRepository;
        }

        public async Task<List<Aluno>> GetAllAlunos()
        {
            return await _alunoRepository.GetAllAsync();
        }

        public async Task<Aluno> GetAlunoById(int id)
        {
            return await _alunoRepository.GetByIdAsync(id);
        }

        public async Task AddAluno(Aluno aluno)
        {
            await _alunoRepository.AddAsync(aluno);
        }

        public async Task UpdateAluno(Aluno aluno)
        {
            await _alunoRepository.UpdateAsync(aluno);
        }

        public async Task DeleteAluno(int id)
        {
            await _alunoRepository.DeleteAsync(id);
        }
    }
}
