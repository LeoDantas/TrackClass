import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlunoService } from '../../../core/services/aluno.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Aluno } from '../../../core/models/aluno.model';
import { Router } from '@angular/router';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css'],
  providers: [MessageService]
})
export class AlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  filteredAlunos: Aluno[] = [];
  filter: string = '';
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'dataNascimento', 'ativo', 'actions'];

  constructor(private alunoService: AlunoService, private turmaAlunoService: TurmaAlunoService, private messageService: MessageService, private router: Router) {}

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
    this.turmaAlunoService.existeAlunoVinculado(id).subscribe(
      (exists) => {
        if (exists) {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'O aluno ja esta vinculado a uma turma, favor desvincular' });
        } else {
          this.alunoService.deleteAluno(id).subscribe(
            (response) => {
              this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno excluido com sucesso' });
              this.ngOnInit();
            },
            (error) => {
              this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir Aluno' });
            }
          );
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao verificar Aluno ' });
      }
    );
  }


  onEdit(id: number): void {
    this.router.navigate(['/alunos/edit', id]);
  }

  onView(id: number): void {
    this.router.navigate(['/aluno/view', id]);
  }

  newAluno(){
    this.router.navigate(['/aluno/new']);
  }
}
