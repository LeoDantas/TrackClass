import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { AlunoListComponent } from './features/aluno/aluno-list/aluno-list.component';
import { AlunoFormComponent } from './features/aluno/aluno-form/aluno-form.component';
import { TurmaListComponent } from './features/turma/turma-list/turma-list.component';
import { TurmaFormComponent } from './features/turma/turma-form/turma-form.component';
import { TurmaAlunoListComponent } from './features/turma-aluno/turma-aluno-list/turma-aluno-list.component';
import { TurmaAlunoFormComponent } from './features/turma-aluno/turma-aluno-form/turma-aluno-form.component';

import { AlunoService } from './core/services/aluno.service';
import { TurmaService } from './core/services/turma.service';
import { TurmaAlunoService } from './core/services/turma-aluno.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const appRoutes: Routes = [
  { path: 'alunos', component: AlunoListComponent },
  { path: 'aluno-form', component: AlunoFormComponent },
  { path: '', redirectTo: '/alunos', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AlunoListComponent,
    AlunoFormComponent,
    TurmaListComponent,
    TurmaFormComponent,
    TurmaAlunoListComponent,
    TurmaAlunoFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [
    AlunoService,
    TurmaService,
    TurmaAlunoService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
