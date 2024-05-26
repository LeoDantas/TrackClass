import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaAlunoService } from '../../../core/services/turma-aluno.service';
import { AlunoService } from '../../../core/services/aluno.service';
import { TurmaService } from '../../../core/services/turma.service';
import { MessageService } from 'primeng/api';

export interface Aluno {
  id: number;
  nome: string;
}

export interface Turma {
  id: number;
  nome: string;
}

@Component({
  selector: 'app-turma-aluno-form',
  templateUrl: './turma-aluno-form.component.html',
  styleUrls: ['./turma-aluno-form.component.css'],
  providers: [MessageService]
})
export class TurmaAlunoFormComponent implements OnInit {
  turmaAlunoForm: FormGroup;
  AlunoId: number | null = null;
  isEdit: boolean = false;
  isDisabled: boolean = false;
  viewFlag: string | null = null;
  listaAlunos: Aluno[] = [];
  listaTurmas: Turma[] = [];
  displayDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private turmaAlunoService: TurmaAlunoService,
    private router: Router,
    private route: ActivatedRoute,
    private alunoService: AlunoService,
    private turmaService: TurmaService,
    private messageService: MessageService
  ) {
    this.turmaAlunoForm = this.fb.group({
      ativo: [true],
      turma: ['', Validators.required],
      aluno: ['']
    });
  }

  ngOnInit(): void {
    this.AlunoId = this.route.snapshot.params['id'] ? +this.route.snapshot.params['id'] : null;
    this.viewFlag = this.router.url;
    //this.isEdit = this.AlunoId != null;

    this.getListaAlunos();
    this.getListaTurmas();
    this.displayDialog = true;

    /*if(this.isDisabled = this.viewFlag.includes('turma/view')){
      this.turmaAlunoForm.get('ativo')?.disable();
      this.turmaAlunoForm.get('turma')?.disable();
      this.turmaAlunoForm.get('aluno')?.disable();
    }
    if (this.AlunoId) {
      this.turmaAlunoService.getTurmaAluno(this.AlunoId).subscribe((Response) =>
        {
          this.turmaAlunoForm.patchValue({
            ativo: Response.ativo,
            turma: Response.turmaId,
            aluno: Response.alunoId,
          });
        }
      );
    }
    */
  }

  getListaAlunos(): void {
    this.alunoService.getAlunos().subscribe(alunos => {
      this.listaAlunos = alunos.map(aluno => ({ id: aluno.id, nome: `${aluno.nome} ${aluno.sobrenome}`  }));
    });
  }

  getListaTurmas(): void {
    this.turmaService.getTurmas().subscribe(turmas => {
      this.listaTurmas = turmas.map(turma => ({ id: turma.id, nome: turma.nome }));
    });
  }

  onSubmit(): void {
    if (this.turmaAlunoForm.valid) {
      const turmaData = this.turmaAlunoForm.value;
      turmaData.alunoId = this.AlunoId;
      turmaData.turmaId = turmaData.turma.id;
      turmaData.dataCriacao = new Date().toISOString();
      turmaData.ativo = true;

      this.turmaAlunoService.existeTurmaAluno(turmaData.alunoId, turmaData.turmaId).subscribe(
        (exists) => {
          if (exists) {
            this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'O aluno já está adicionado a essa turma' });
          } else {
            this.turmaAlunoService.addTurmaAluno(turmaData).subscribe(
              (response) => {
                this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Aluno adicionada a Turma com sucesso' });
                setTimeout(() => {
                  this.router.navigate(['/turma-aluno']);
                }, 2000);
              },
              (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao adicionar Turma Aluno' });
              }
            );
          }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao verificar Turma Aluno' });
        }
      );
    }
  }

  onCancel(): void {
    this.router.navigate(['/turma-aluno']);
  }
}
