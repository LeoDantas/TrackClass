import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = 'http://localhost:5017/api/Aluno';

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    console.log(this.http.get<Aluno[]>(this.apiUrl));
    return this.http.get<Aluno[]>(this.apiUrl);
  }

  getAluno(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.apiUrl}/${id}`);
  }

  addAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl, aluno);
  }

  updateAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.put<Aluno>(`${this.apiUrl}/${aluno.id}`, aluno);
  }

  deleteAluno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
