import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turma } from '../models/turma.model';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {
  private apiUrl = 'http://localhost:5017/api/Turma';

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.apiUrl);
  }

  getTurma(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${this.apiUrl}/${id}`);
  }

  addTurma(turma: Turma): Observable<Turma> {
    return this.http.post<Turma>(this.apiUrl, turma);
  }

  updateTurma(turma: Turma): Observable<Turma> {
    return this.http.put<Turma>(`${this.apiUrl}/${turma.id}`, turma);
  }

  deleteTurma(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
