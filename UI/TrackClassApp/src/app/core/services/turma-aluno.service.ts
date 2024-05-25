import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TurmaAluno } from '../models/turma-aluno.model';

@Injectable({
  providedIn: 'root'
})
export class TurmaAlunoService {
  private apiUrl = 'http://localhost:5017/api/TurmaAluno';

  constructor(private http: HttpClient) { }

  getTurmaAlunos(): Observable<TurmaAluno[]> {
    return this.http.get<TurmaAluno[]>(this.apiUrl);
  }

  getTurmaAluno(id: number): Observable<TurmaAluno> {
    return this.http.get<TurmaAluno>(`${this.apiUrl}/${id}`);
  }

  addTurmaAluno(turmaAluno: TurmaAluno): Observable<TurmaAluno> {
    return this.http.post<TurmaAluno>(this.apiUrl, turmaAluno);
  }

  updateTurmaAluno(turmaAluno: TurmaAluno): Observable<TurmaAluno> {
    return this.http.put<TurmaAluno>(`${this.apiUrl}/${turmaAluno.id}`, turmaAluno);
  }

  deleteTurmaAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
