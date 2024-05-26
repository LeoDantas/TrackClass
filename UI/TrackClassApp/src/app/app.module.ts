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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';

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
import { HomeComponent } from './home/home.component';
import { ConfirmDialogComponent } from './features/confirm-dialog/confirm-dialog.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'alunos', component: AlunoListComponent },
  { path: 'turmas', component: TurmaListComponent },
  { path: 'turma-aluno', component: TurmaAlunoListComponent },
  { path: 'aluno/new', component: AlunoFormComponent },
  { path: 'aluno/view/:id', component: AlunoFormComponent },
  { path: 'alunos/edit/:id', component: AlunoFormComponent },
  { path: 'turma/new', component: TurmaFormComponent },
  { path: 'turma/view/:id', component: TurmaFormComponent },
  { path: 'turmas/edit/:id', component: TurmaFormComponent },
  { path: 'turma-aluno/new/:id', component: TurmaAlunoFormComponent },
  { path: 'turma-aluno/view/:id', component: TurmaAlunoFormComponent },
  { path: 'turma-aluno/edit/:id', component: TurmaAlunoFormComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AlunoListComponent,
    AlunoFormComponent,
    TurmaListComponent,
    TurmaFormComponent,
    TurmaAlunoListComponent,
    TurmaAlunoFormComponent,
    HomeComponent,
    ConfirmDialogComponent
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDialogModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ToastModule,
    DropdownModule
  ],
  providers: [
    AlunoService,
    TurmaService,
    TurmaAlunoService,
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    DatePipe,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
