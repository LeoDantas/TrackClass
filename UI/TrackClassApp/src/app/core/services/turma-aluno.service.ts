import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurmaAluno } from '../models/turma-aluno.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SearchByAlunoId } from '../models/searchByAlunoId.model';
import { MessageService } from 'primeng/api';
import { TurmaAlunoNome } from '../models/turma-aluno-nome.model';

export interface TurmaAlunoResponse {
  result: SearchByAlunoId[];
}


@Injectable({
  providedIn: 'root',
})
export class TurmaAlunoService {
  private apiUrl = 'http://localhost:5017/api/TurmaAluno';

  constructor(private http: HttpClient, private messageService: MessageService) { }

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
    this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluido com sucesso!' });
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchByAlunoId(alunoId: number): Observable<SearchByAlunoId[]> {
    let params = new HttpParams().set('alunoId', alunoId.toString());
    return this.http.get<TurmaAlunoResponse>(`${this.apiUrl}/searchByAlunoId`, { params }).pipe(
      map(response => {
        if (response.result.length === 0) {
          this.messageService.add({ severity: 'warn', summary: 'Nenhum resultado', detail: 'Não foram encontradas turmas para o aluno.' });
        }
        return response.result;
      })
    );
  }

  existeTurmaAluno(alunoId: number, turmaId: number): Observable<boolean> {
    let params = new HttpParams()
     .set('alunoId', alunoId.toString())
      .set('turmaId', turmaId.toString());
    return this.http.get<any>(`${this.apiUrl}/existeTurmaAluno`, { params }).pipe(map(response => response.result.value));;
  }
  existeAlunoVinculado(alunoId: number): Observable<boolean> {
    let params = new HttpParams()
     .set('alunoId', alunoId.toString())
    return this.http.get<any>(`${this.apiUrl}/existeAlunoVinculado`, { params }).pipe(map(response => response.result.value));;
  }
  existeTurmaVinculada(turmaId: number): Observable<boolean> {
    let params = new HttpParams()
      .set('turmaId', turmaId.toString());
    return this.http.get<any>(`${this.apiUrl}/existeTurmaVinculada`, { params }).pipe(map(response => response.result.value));;
  }

  getTurmaAlunoNome(): Observable<TurmaAlunoNome[]> {
    return this.http.get<TurmaAlunoNome[]>(`${this.apiUrl}/getAllTurmaAlunoNome`)
  }
}
