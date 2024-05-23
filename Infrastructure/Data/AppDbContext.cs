using Microsoft.EntityFrameworkCore;
using Domain.Entities;
using Domain.DTOs;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<AlunoDto> Aluno { get; set; }
        public DbSet<TurmaDto> Turma { get; set; }
        public DbSet<TurmaAlunoDto> TurmaAluno { get; set; }
    }
}
