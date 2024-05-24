using Domain.DTOs;
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
        Task<List<TurmaDto>> GetAllTurmas();
        Task<TurmaDto> GetTurmaById(int id);
        Task AddTurma(TurmaDto turma);
        Task UpdateTurma(TurmaDto turma);
        Task DeleteTurma(int id);
    }
}
