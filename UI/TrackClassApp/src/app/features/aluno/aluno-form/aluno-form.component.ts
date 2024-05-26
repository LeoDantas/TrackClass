import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../../core/services/aluno.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  alunoForm: FormGroup;
  alunoId: number | null = null;
  isEdit: boolean = false;
  isDisabled: boolean = false;
  viewFlag: string | null = null;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.alunoForm = this.fb.group({
      ativo: [true],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.alunoId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.viewFlag = this.router.url;
    this.isEdit = this.alunoId != null;
    if(this.isDisabled = this.viewFlag.includes('aluno/view')){
      this.alunoForm.get('ativo')?.disable();
      this.alunoForm.get('nome')?.disable();
      this.alunoForm.get('sobrenome')?.disable();
      this.alunoForm.get('email')?.disable();
      this.alunoForm.get('dataNascimento')?.disable();
    }
    if (this.alunoId) {
      this.alunoService.getAluno(this.alunoId).subscribe((Response) =>
        {
          const date = new Date(Response.dataNascimento);
          this.alunoForm.patchValue({
            nome: Response.nome,
            sobrenome: Response.sobrenome,
            ativo: Response.ativo,
            email: Response.email,
            dataNascimento: date
          });
        }
      );
    }

  }

  onSubmit(): void {
    if (this.alunoForm.valid) {

      if (this.alunoId) {
        this.alunoService.updateAluno({ ...this.alunoForm.value, id: this.alunoId }).subscribe(() => {
          this.router.navigate(['/alunos']);
        });
      } else {
        const alunoData = this.alunoForm.value;
        alunoData.dataCriacao = new Date().toISOString();
        alunoData.ativo = true;
        this.alunoService.addAluno(alunoData).subscribe(() => {
          this.router.navigate(['/alunos']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/alunos']);
  }

}
