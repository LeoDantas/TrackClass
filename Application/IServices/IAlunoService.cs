using Domain.DTOs;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IAlunoService
    {
        Task<List<AlunoDto>> GetAllAlunos();
        Task<AlunoDto> GetAlunoById(int id);
        Task AddAluno(AlunoDto aluno);
        Task UpdateAluno(AlunoDto aluno);
        Task DeleteAluno(int id);
    }
}
