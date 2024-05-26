import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../../core/services/turma.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css'],
  providers: [MessageService]
})
export class TurmaFormComponent implements OnInit {
  turmaForm: FormGroup;
  turmaId: number | null = null;
  isEdit: boolean = false;
  isDisabled: boolean = false;
  viewFlag: string | null = null;
  titulo: string = 'Adicionar Turma';

  constructor(
    private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
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

    if (this.isEdit) {
      this.titulo = 'Alterar Turma';
    }

    if(this.isDisabled = this.viewFlag.includes('turma/view')){
      this.titulo = 'Visualizar Turma';
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
        this.turmaService.updateTurma({ ...this.turmaForm.value, id: this.turmaId }).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Turma alterada com sucesso' });
          setTimeout(() => {
            this.router.navigate(['/turmas']);
          }, 2000);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao alterar Turma' });
        }
      );
      } else {
        const turmaData = this.turmaForm.value;
        turmaData.dataCriacao = new Date().toISOString();
        turmaData.ativo = true;
        this.turmaService.addTurma(turmaData).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Turma adicionada com sucesso' });
          setTimeout(() => {
            this.router.navigate(['/turmas']);
          }, 2000);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar Turma' });
        }
      );
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/turmas']);
  }
}
