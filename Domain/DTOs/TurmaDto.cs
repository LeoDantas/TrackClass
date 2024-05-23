namespace Domain.DTOs
{
    public class TurmaDto
    {
        public int Id { get; set; }
        public DateTime DataCriacao { get; set; }
        public bool Ativo { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
    }
}
