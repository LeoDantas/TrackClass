namespace Domain.Entities
{
    public class TurmaAluno
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
        public int TurmaId { get; set; }
        public int AlunoId { get; set; }
    }
}
