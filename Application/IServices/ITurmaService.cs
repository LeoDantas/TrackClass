using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ITurmaService
    {
        Task<List<Turma>> GetAllTurmas();
        Task<Turma> GetTurmaById(int id);
        Task AddTurma(Turma turma);
        Task UpdateTurma(Turma turma);
        Task DeleteTurma(int id);
    }
}
