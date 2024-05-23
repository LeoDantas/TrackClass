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
        Task<List<Aluno>> GetAllAlunos();
        Task<Aluno> GetAlunoById(int id);
        Task AddAluno(Aluno aluno);
        Task UpdateAluno(Aluno aluno);
        Task DeleteAluno(int id);
    }
}
