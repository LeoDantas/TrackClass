import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../../core/services/turma.service';
import { Turma } from '../../../core/models/turma.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css']
})
export class TurmaListComponent implements OnInit {
  turmas: Turma[] = [];
  filteredTurmas: Turma[] = [];
  filter: string = '';
  displayedColumns: string[] = ['ativo', 'nome', 'descricao'];

  constructor(private turmaService: TurmaService, private router: Router) { }

  ngOnInit(): void {
    this.turmaService.getTurmas().subscribe(turmas => {
      this.turmas = turmas;
      this.filteredTurmas = turmas;
    });
  }

  filterAlunos(): void {
    this.filteredTurmas = this.turmas.filter(turma =>
      turma.nome.toLowerCase().includes(this.filter.toLowerCase()) ||
      turma.descricao.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  onDelete(id: number): void {
    this.turmaService.deleteTurma(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/turmas/edit', id]);
  }

  onView(id: number): void {
    this.router.navigate(['/turma/view', id]);
  }

  newTurma(){
    this.router.navigate(['/turma/new']);
  }
}
