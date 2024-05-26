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
  { path: 'aluno/new', component: AlunoFormComponent },
  { path: 'aluno/view/:id', component: AlunoFormComponent },
  { path: 'alunos/edit/:id', component: AlunoFormComponent },
  { path: 'turmas', component: TurmaListComponent },
  { path: 'turma/new', component: TurmaFormComponent },
  { path: 'turma/view/:id', component: TurmaFormComponent },
  { path: 'turmas/edit/:id', component: TurmaFormComponent },
  { path: 'turma-alunos', component: TurmaAlunoListComponent },
  { path: 'turma-aluno/new/:id', component: TurmaAlunoFormComponent },
  { path: 'turma-aluno/view/:id', component: TurmaAlunoFormComponent },
  { path: 'turma-aluno/edit/:id', component: TurmaAlunoFormComponent },
  { path: '', redirectTo: '/alunos', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
