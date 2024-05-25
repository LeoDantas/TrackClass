import { Component, OnInit } from '@angular/core';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { TurmaAluno } from '../../../core/models/turma-aluno.model';

@Component({
  selector: 'app-turma-aluno-list',
  templateUrl: './turma-aluno-list.component.html',
  styleUrls: ['./turma-aluno-list.component.css']
})
export class TurmaAlunoListComponent implements OnInit {
  turmaAlunos: TurmaAluno[] = [];

  constructor(private turmaAlunoService: TurmaAlunoService) { }

  ngOnInit(): void {
    this.loadTurmaAlunos();
  }

  loadTurmaAlunos() {
    this.turmaAlunoService.getTurmaAlunos().subscribe(data => {
      this.turmaAlunos = data;
    });
  }

  deleteTurmaAluno(id: number) {
    this.turmaAlunoService.deleteTurmaAluno(id).subscribe(() => {
      this.loadTurmaAlunos();
    });
  }
}
