import { Component, OnInit } from '@angular/core';
import { TurmaAluno } from '../../../core/models/turma-aluno.model';
import { SearchByAlunoId } from '../../../core/models/searchByAlunoId.model';
import { Aluno } from '../../../core/models/aluno.model';
import { Turma } from '../../../core/models/turma.model';
import { Router } from '@angular/router'
import { AlunoService } from '../../../core/services/aluno.service';
import { TurmaService } from '../../../core/services/turma.service';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';


@Component({
  selector: 'app-turma-aluno-list',
  templateUrl: './turma-aluno-list.component.html',
  styleUrls: ['./turma-aluno-list.component.css']
})
export class TurmaAlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  filteredAlunos: Aluno[] = [];
  filter: string = '';
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'dataNascimento', 'ativo', 'actions'];
  selectedAluno: Aluno | null = null;
  turmas: Turma[] = [];
  displayDialog: boolean = false;
  displayDialogAdd: boolean = false;
  alunoId: number | null = null;
  turmaAlunos: SearchByAlunoId[] = [];
  filteredTurmaAlunos: SearchByAlunoId[] = [];
  errorMessage: string = '';

  constructor(private alunoService: AlunoService, private turmaService: TurmaService, private turmaAlunoService: TurmaAlunoService, private router: Router) {}

  ngOnInit(): void {
    this.alunoService.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
      this.filteredAlunos = alunos;
    });
  }

  filterAlunos(): void {
    this.filteredAlunos = this.alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(this.filter.toLowerCase()) ||
      aluno.sobrenome.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  onDelete(id: number): void {
    this.turmaAlunoService.deleteTurmaAluno(id).subscribe(() => {
      this.displayDialog = false;
    });
  }


  onEdit(id: number): void {
    this.router.navigate(['/turma-aluno/edit', id]);
  }

  onView(id: number): void {
    this.router.navigate(['/turma-aluno/view', id]);
  }

  newTurmaAluno(id: number): void{
    this.router.navigate(['/turma-aluno/new', id]);
  }

  searchByAlunoId(alunoId: number): void {
    if (alunoId !== null) {
      this.turmaAlunoService.searchByAlunoId(alunoId).subscribe(
        turmaAlunos => {
          this.filteredTurmaAlunos = turmaAlunos;
          this.errorMessage = '';
        },
        error => {
          this.errorMessage = error.error.message;
          this.filteredTurmaAlunos = [];
        }
      );
    }
  }

  showTurmasDialog(aluno: Aluno): void {
    this.selectedAluno = aluno;
    this.turmaAlunoService.searchByAlunoId(aluno.id).subscribe(turmas => {
      if(turmas.length > 0){
        this.turmaAlunos = turmas;
        this.displayDialog = true;
      }
    });
  }

}
