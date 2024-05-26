using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class TurmaAlunoNomeDto
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
        public string NomeAluno { get; set; }
        public string NomeTurma { get; set; }
    }
}
