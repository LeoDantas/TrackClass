import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno.service';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  alunoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private router: Router
  ) {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.alunoForm.valid) {
      this.alunoService.addAluno(this.alunoForm.value).subscribe(() => {
        this.router.navigate(['/aluno-list']);
      });
    }
  }
}
