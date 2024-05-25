import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { TurmaAluno } from '../../../core/models/turma-aluno.model';

@Component({
  selector: 'app-turma-aluno-form',
  templateUrl: './turma-aluno-form.component.html',
  styleUrls: ['./turma-aluno-form.component.css']
})
export class TurmaAlunoFormComponent implements OnInit {
  turmaAlunoForm: FormGroup;
  turmaAlunoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private turmaAlunoService: TurmaAlunoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.turmaAlunoForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.turmaAlunoId = id ? +id : null;
      if (this.turmaAlunoId) {
        this.turmaAlunoService.getTurmaAluno(this.turmaAlunoId).subscribe(data => {
          this.turmaAlunoForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.turmaAlunoForm.valid) {
      if (this.turmaAlunoId) {
        this.turmaAlunoService.updateTurmaAluno({ id: this.turmaAlunoId, ...this.turmaAlunoForm.value }).subscribe(() => {
          this.router.navigate(['/turma-alunos']);
        });
      } else {
        this.turmaAlunoService.addTurmaAluno(this.turmaAlunoForm.value).subscribe(() => {
          this.router.navigate(['/turma-alunos']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/turma-alunos']);
  }
}
