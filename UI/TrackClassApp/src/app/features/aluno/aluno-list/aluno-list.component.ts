import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlunoService } from '../../../core/services/aluno.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { Aluno } from '../../../core/models/aluno.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  filteredAlunos: Aluno[] = [];
  filter: string = '';
  displayedColumns: string[] = ['nome', 'sobrenome', 'email', 'dataNascimento', 'ativo', 'actions']; // Adicionada propriedade displayedColumns

  constructor(private alunoService: AlunoService, private router: Router) {}

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
    this.alunoService.deleteAluno(id).subscribe(() => {
      this.ngOnInit();
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
}
