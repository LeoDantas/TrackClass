import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../../core/services/turma.service';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit {
  turmaForm: FormGroup;
  turmaId: number | null = null;
  isEdit: boolean = false;
  isDisabled: boolean = false;
  viewFlag: string | null = null;

  constructor(
    private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.turmaForm = this.fb.group({
      ativo: [true],
      nome: ['', Validators.required],
      descricao: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.turmaId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.viewFlag = this.router.url;
    this.isEdit = this.turmaId != null;
    if(this.isDisabled = this.viewFlag.includes('turma/view')){
      this.turmaForm.get('ativo')?.disable();
      this.turmaForm.get('nome')?.disable();
      this.turmaForm.get('descricao')?.disable();
    }
    if (this.turmaId) {
      this.turmaService.getTurma(this.turmaId).subscribe((Response) =>
        {
          this.turmaForm.patchValue({
            nome: Response.nome,
            descricao: Response.descricao,
            ativo: Response.ativo,
          });
        }
      );
    }
  }

  onSubmit(): void {
    if (this.turmaForm.valid) {

      if (this.turmaId) {
        this.turmaService.updateTurma({ ...this.turmaForm.value, id: this.turmaId }).subscribe(() => {
          this.router.navigate(['/turmas']);
        });
      } else {
        const turmaData = this.turmaForm.value;
        turmaData.dataCriacao = new Date().toISOString();
        turmaData.ativo = true;
        this.turmaService.addTurma(turmaData).subscribe(() => {
          this.router.navigate(['/turmas']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/turmas']);
  }
}
