import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlunoService } from '../../../core/services/aluno.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css'],
  providers: [MessageService]
})
export class AlunoListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'dataNascimento', 'ativo', 'actions'];
  alunos: any[] = [];
  filteredAlunos: any[] = [];
  filter: string = '';
  sortField: string = '';
  sortOrder: number = 1;

  constructor(private alunoService: AlunoService, private turmaAlunoService: TurmaAlunoService,
    private messageService: MessageService, private router: Router, public dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir este aluno?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
    });
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

  gerarRelatorioPDF(): void {
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(18);
    doc.text('Relatório de Alunos', 10, y);

    const headers = [['Nome', 'Sobrenome', 'Email', 'Data de Nascimento', 'Ativo']];
    const data = this.alunos.map(aluno => [
        aluno.nome,
        aluno.sobrenome,
        aluno.email,
        new Date(aluno.dataNascimento).toLocaleDateString(),
        aluno.ativo ? 'Sim' : 'Não'
    ]);

    (doc as any).autoTable({
        startY: 25,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { cellPadding: 3, fontSize: 12 },
        columnStyles: { 4: { cellWidth: 'wrap' } }
    });

    doc.save('relatorio_alunos.pdf');
  }

  customSort(event: any) {
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.filteredAlunos.sort((a, b) => {
      let value1 = a[this.sortField];
      let value2 = b[this.sortField];
      let result = null;

      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2 ? -1 : (value1 > value2 ? 1 : 0));

      return (this.sortOrder * result);
    });
  }
}
