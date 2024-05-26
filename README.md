# API em .NET 7.0 com Entity Framework e SQLite

Este repositório contém uma API desenvolvida em .NET 7.0 utilizando o Entity Framework Core e SQLite como banco de dados. A API fornece funcionalidades básicas de CRUD para gerenciar alunos, turmas e a relação entre eles.

## Pré-requisitos
- .NET 7.0 SDK: [Download .NET 7.0](https://dotnet.microsoft.com/pt-br/download/dotnet/7.0)
- Visual Studio 2022 ou Visual Studio Code
- Git

## Clonando o Repositório

```bash
  git clone https://github.com/LeoDantas/TrackClass.git
  cd TrackClass/WebApi
```

## Configuração do Ambiente

Restaurar as dependências do projeto:

```bash
  dotnet restore
```

## Configurando o Banco de dados

A aplicação utiliza o Entity Framework Core com SQLite. Para configurar o banco de dados, você deve aplicar as migrações:

```bash
  dotnet ef migrations add InitialCreate
  dotnet ef database update
```

## Configuração do arquivo `appsettings.json`

No arquivo appsettings.json, a string de conexão para o SQLite já está configurada:

```json
  {
    "ConnectionStrings": {
        "DefaultConnection": "Data Source=TrackClass.db"
    },
    "Logging": {
        "LogLevel": {
        "Default": "Information",
        "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*"
  }
```


## Executando a Aplicação

Para iniciar a aplicação, execute o seguinte comando:

```bash
  dotnet run
```

A API estará disponível em http://localhost:5017.

## Estrutura do Projeto
- Presentation: Contém os controladores da API.
- Domain: Contém os modelos de dados.
- Infrastructure: Contém o contexto do Entity Framework.
- Application: Contém serviços para encapsular a lógica de negócio.

## Endpoints
### Alunos
- GET /api/Aluno: Retorna todos os alunos.
- GET /api/Aluno/{id}: Retorna um aluno pelo ID.
- POST /api/Aluno: Cria um novo aluno.
- PUT /api/Aluno/{id}: Atualiza um aluno existente.
- DELETE /api/Aluno/{id}: Deleta um aluno pelo ID.

### Turmas
- GET /api/Turma: Retorna todas as turmas.
- GET /api/Turma/{id}: Retorna uma turma pelo ID.
- POST /api/Turma: Cria uma nova turma.
- PUT /api/Turma/{id}: Atualiza uma turma existente.
- DELETE /api/Turma/{id}: Deleta uma turma pelo ID.

### Turmas-Alunos
- GET /api/TurmaAluno: Retorna todas as vinculações de alunos e turmas.
- GET /api/TurmaAluno/getAllTurmaAlunoNome: Retorna todas as vinculações de alunos e turmas, apresentando o nome da turma e do aluno.
- GET /api/TurmaAluno/{alunoId}/{turmaId}: Retorna uma vinculação específica pelo ID do aluno e ID da turma.
- POST /api/TurmaAluno: Cria uma nova vinculação de aluno a uma turma.
- PUT /api/TurmaAluno/{id}: Atualiza uma turma existente.
- DELETE /api/TurmaAluno/{alunoId}/{turmaId}: Deleta uma vinculação de aluno a uma turma pelo ID do aluno e ID da turma.
- GET /api/TurmaAluno/searchByAlunoId?alunoId={alunoId}: Retorna as turmas de um aluno específico.
- GET /api/TurmaAluno/existeTurmaAluno?alunoId={alunoId}&turmaId={turmaId}: Verifica se ja existe vinculo entre aluno e turma.
- GET /api/TurmaAluno/existeAlunoVinculado?alunoId={alunoId}: Verifica se o aluno em questão esta vinculado em alguma turma.
- GET /api/TurmaAluno/existeTurmaVinculada?turmaId={turmaId}: Verifica se a turma em quatao esta vinculada em alguma aluno.


## Documentação da API
A documentação da API é gerada automaticamente utilizando o Swagger. Para acessar a documentação, execute a aplicação e navegue até https://localhost:5017/swagger.

# Projeto Angular
Este é um projeto Angular que foi desenvolvido para controle e gestão de escolas, com o intuito de otimizar a vinculação de alunos em turmas.

## Bibliotecas Utilizadas
- Angular: Utilizado como framework principal para o desenvolvimento da aplicação web devido à sua capacidade de criar single-page applications de forma eficiente e organizada.
- Angular CLI: Utilizado para facilitar a criação de novos componentes, serviços, módulos e outros artefatos do Angular, agilizando o desenvolvimento.
- Angular Material: Conjunto de componentes UI do Google para Angular, seguindo as diretrizes de Material Design, o que proporciona uma interface consistente e moderna.
- PrimeNG: Utilizado para a implementação de componentes de interface ricos e interativos, como tabelas, botões e caixas de diálogo, proporcionando uma experiência de usuário melhorada.
- RxJS: Utilizado para programação reativa, permitindo o gerenciamento de fluxos de dados de forma assíncrona e eficiente, facilitando a comunicação entre os componentes da aplicação.

## Benefícios para o Projeto
- Melhoria na Experiência do Usuário: O uso de componentes prontos e bem desenhados do PrimeNG e Angular Material contribui para uma interface mais agradável e intuitiva.

- Facilidade de Desenvolvimento: O Angular 18 oferece recursos avançados que simplificam o desenvolvimento de aplicações web complexas, como suporte a lazy loading, melhorias de desempenho e novas funcionalidades.

- Manutenção Simplificada: A arquitetura em camadas e a estrutura modular do Angular facilitam a manutenção do código, permitindo que novas funcionalidades sejam adicionadas e bugs sejam corrigidos com mais facilidade.

- Performance Aprimorada: O uso de técnicas reativas com RxJS e boas práticas de desenvolvimento contribuem para uma aplicação mais performática e responsiva.

## Instalação
```bash
  git clone https://github.com/LeoDantas/TrackClass.git
  npm install
```

## Executando a Aplicação
Para iniciar a aplicação, execute o seguinte comando:
```bash
  ng serve
```
Acesse a aplicação em `http://localhost:4200`.

## Funcionalidades
- Listagem e inserção de Alunos.
- Listagem e inserção de Turmas.
- Vinculação de Alunos em Turmas.

## Arquitetura Utilizada 
Ambos os projetos utilizam a arquitetura em camadas (Onion Architecture), que é uma abordagem de arquitetura de software que visa manter o código altamente modular e independente de frameworks externos. A arquitetura em camadas é composta por três camadas principais:

- Camada de Aplicação: Responsável por conter a lógica de aplicação da aplicação, como serviços, regras de negócio e mapeamento de dados. Essa camada não possui dependências externas e é independente de qualquer infraestrutura.
- Camada de Domínio: Responsável por conter as entidades e objetos de valor do domínio da aplicação, bem como as interfaces dos repositórios. Esta camada é o núcleo da aplicação e é independente de qualquer infraestrutura ou lógica de aplicação.
- Camada de Infraestrutura: Responsável por conter a implementação dos repositórios e serviços externos, como acesso a banco de dados, chamadas de API e outros. Esta camada depende das camadas de aplicação e domínio, mas não possui lógica de negócio.

## Benefícios da Arquitetura em Camadas
- Separação de Responsabilidades: Cada camada possui uma responsabilidade clara, facilitando a manutenção e o entendimento do código.
- Testabilidade: A separação das camadas permite testar cada parte da aplicação de forma isolada, facilitando a criação de testes unitários e de integração.
- Flexibilidade: A arquitetura em camadas permite que as diferentes partes da aplicação evoluam de forma independente, facilitando a adição de novas funcionalidades e a manutenção do código.
- Reutilização de Código: A separação das camadas facilita a reutilização de código em diferentes partes da aplicação ou em outros projetos.

## Contribuições
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Contato
Para mais informações, entre em contato com llndantasf@gmail.com

## 
Feito com ❤️ por [Leonardo Dantas](https://github.com/LeoDantas)
## 
