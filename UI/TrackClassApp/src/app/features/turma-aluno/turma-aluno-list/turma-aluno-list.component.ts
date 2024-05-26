import { Component, OnInit } from '@angular/core';
import { SearchByAlunoId } from '../../../core/models/searchByAlunoId.model';
import { Aluno } from '../../../core/models/aluno.model';
import { Turma } from '../../../core/models/turma.model';
import { Router } from '@angular/router'
import { AlunoService } from '../../../core/services/aluno.service';
import { TurmaService } from '../../../core/services/turma.service';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


@Component({
  selector: 'app-turma-aluno-list',
  templateUrl: './turma-aluno-list.component.html',
  styleUrls: ['./turma-aluno-list.component.css']
})
export class TurmaAlunoListComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'dataNascimento', 'ativo', 'actions'];
  turmas: Turma[] = [];
  displayDialogAdd: boolean = false;
  alunoId: number | null = null;
  filteredTurmaAlunos: SearchByAlunoId[] = [];
  errorMessage: string = '';
  alunos: any[] = [];
  filteredAlunos: any[] = [];
  filter: string = '';
  sortField: string = '';
  sortOrder: number = 1;
  displayDialog: boolean = false;
  selectedAluno: any;
  turmaAlunos: any[] = [];
  turmaAlunosNome: any[] = [];

  constructor(private alunoService: AlunoService, private turmaService: TurmaService,
    private turmaAlunoService: TurmaAlunoService, private router: Router,
    public dialog: MatDialog) {}

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

  gerarRelatorioPDF(): void {
    const doc = new jsPDF();
    let y = 15;

    doc.setFontSize(18);
    doc.text('Relatório de Alunos Vinculados a Turmas', 10, y);

    this.turmaAlunoService.getTurmaAlunoNome().subscribe(turmaAlunosNome => {
      this.turmaAlunosNome = turmaAlunosNome;
    });

    const headers = [['Nome Aluno', 'Nome Turma', 'Ativo']];
    const data = this.turmaAlunosNome.map(turmaAluno => [
      turmaAluno.nomeAluno,
      turmaAluno.nomeTurma,
      turmaAluno.ativo ? 'Sim' : 'Não'
    ]);

    (doc as any).autoTable({
        startY: 25,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { cellPadding: 3, fontSize: 12 },
        columnStyles: { 4: { cellWidth: 'wrap' } }
    });

    doc.save('relatorio_turma_alunos.pdf');
  }

  customSort(event: any): void {
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
