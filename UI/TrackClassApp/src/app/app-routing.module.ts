import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoListComponent } from './features/aluno/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './features/aluno/aluno-form/aluno-form.component';
import { TurmaListComponent } from './features/turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './features/turma/turma-form/turma-form.component';
import { TurmaAlunoListComponent } from './features/turma-aluno/turma-aluno-list/turma-aluno-list.component';
import { TurmaAlunoFormComponent } from './features/turma-aluno/turma-aluno-form/turma-aluno-form.component';

const routes: Routes = [
  { path: 'alunos', component: AlunoListComponent },
  { path: 'aluno-form', component: AlunoFormComponent },
  { path: 'aluno-form/:id', component: AlunoFormComponent },
  { path: 'turmas', component: TurmaListComponent },
  { path: 'turma-form', component: TurmaFormComponent },
  { path: 'turma-form/:id', component: TurmaFormComponent },
  { path: 'turma-alunos', component: TurmaAlunoListComponent },
  { path: 'turma-aluno-form', component: TurmaAlunoFormComponent },
  { path: 'turma-aluno-form/:id', component: TurmaAlunoFormComponent },
  { path: '', redirectTo: '/alunos', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
