namespace Domain.DTOs
{
    public class TurmaAlunoDto
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
        public int TurmaId { get; set; }
        public int AlunoId { get; set; }
    }
}
