import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../../../core/services/turma.service';
import { Router } from '@angular/router'
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { MessageService } from 'primeng/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-turma-list',
  templateUrl: './turma-list.component.html',
  styleUrls: ['./turma-list.component.css'],
  providers: [MessageService]
})
export class TurmaListComponent implements OnInit {
  displayedColumns: string[] = ['ativo', 'nome', 'descricao'];
  sortField: string = '';
  sortOrder: number = 1;
  turmas: any[] = [];
  filteredTurmas: any[] = [];
  filter: string = '';

  constructor(private turmaService: TurmaService,  private turmaAlunoService: TurmaAlunoService,
    private messageService: MessageService, private router: Router,
    public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja excluir esta turma?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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

  gerarRelatorioPDF(): void {
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(18);
    doc.text('Relatório de Turmas', 10, y);

    const headers = [['Nome', 'Descrição', 'Ativo']];
    const data = this.turmas.map(turma => [
        turma.nome,
        turma.descricao,
        turma.ativo ? 'Sim' : 'Não'
    ]);

    (doc as any).autoTable({
        startY: 25,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { cellPadding: 3, fontSize: 12 },
        columnStyles: { 4: { cellWidth: 'wrap' } }
    });

    doc.save('relatorio_turmas.pdf');
  }

  customSort(event: any): void {
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.filteredTurmas.sort((a, b) => {
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
