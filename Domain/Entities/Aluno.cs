namespace Domain.Entities
{
    public class Aluno
    {
        public int Id{ get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public DateTime DataNascimento { get; set; }
    }
}
