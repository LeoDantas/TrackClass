import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlunoService } from '../../../core/services/aluno.service';
import { Aluno } from '../../../core/models/aluno.model';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  filteredAlunos: Aluno[] = [];
  searchForm: FormGroup;
  displayedColumns: string[] = ['nome', 'actions']; // Adicionada propriedade displayedColumns

  constructor(private alunoService: AlunoService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    this.loadAlunos();
    this.searchForm.get('search')?.valueChanges.subscribe(value => {
      this.filterAlunos(value);
    });
  }

  loadAlunos() {
    this.alunoService.getAlunos().subscribe(data => {
      this.alunos = data;
      this.filteredAlunos = data;
    });
  }

  filterAlunos(query: string) {
    this.filteredAlunos = this.alunos.filter(aluno =>
      aluno.nome.toLowerCase().includes(query.toLowerCase()));
  }

  deleteAluno(id: number) {
    this.alunoService.deleteAluno(id).subscribe(() => {
      this.loadAlunos();
    });
  }

  get searchControl(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }
}
