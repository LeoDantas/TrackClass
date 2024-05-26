import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../../core/services/turma.service';
import { Turma } from '../../../core/models/turma.model';
import { Router } from '@angular/router'
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css'],
  providers: [MessageService]
})
export class TurmaListComponent implements OnInit {
  turmas: Turma[] = [];
  filteredTurmas: Turma[] = [];
  filter: string = '';
  displayedColumns: string[] = ['ativo', 'nome', 'descricao'];

  constructor(private turmaService: TurmaService,  private turmaAlunoService: TurmaAlunoService,private messageService: MessageService, private router: Router) { }

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
    this.turmaAlunoService.existeTurmaVinculada(id).subscribe(
      (exists) => {
        if (exists) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'A turma ja esta vinculada a um aluno, favor desvincular' });
        } else {
          this.turmaService.deleteTurma(id).subscribe(
            (response) => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Turma excluida com sucesso' });
              this.ngOnInit();
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir Turma' });
            }
          );
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao verificar Turma ' });
      }
    );
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
