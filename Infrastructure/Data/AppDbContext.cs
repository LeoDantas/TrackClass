using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Aluno> Aluno { get; set; }
        public DbSet<Turma> Turma { get; set; }
        public DbSet<TurmaAluno> TurmaAluno { get; set; }
    }
}
