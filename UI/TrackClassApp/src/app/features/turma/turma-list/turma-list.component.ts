import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../../core/services/turma.service';
import { Turma } from '../../../core/models/turma.model';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {
  turmas: Turma[] = [];

  constructor(private turmaService: TurmaService) { }

  ngOnInit(): void {
    this.loadTurmas();
  }

  loadTurmas() {
    this.turmaService.getTurmas().subscribe(data => {
      this.turmas = data;
    });
  }

  deleteTurma(id: number) {
    this.turmaService.deleteTurma(id).subscribe(() => {
      this.loadTurmas();
    });
  }
}
