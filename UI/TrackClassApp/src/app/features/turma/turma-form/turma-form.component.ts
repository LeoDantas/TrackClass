import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurmaService } from '../../../core/services/turma.service';
import { Turma } from '../../../core/models/turma.model';

@Component({
  selector: 'app-turma-form',
  templateUrl: './turma-form.component.html',
  styleUrls: ['./turma-form.component.css']
})
export class TurmaFormComponent implements OnInit {
  turmaForm: FormGroup;
  turmaId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private turmaService: TurmaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.turmaForm = this.fb.group({
      nome: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.turmaId = id ? +id : null;
      if (this.turmaId) {
        this.turmaService.getTurma(this.turmaId).subscribe(data => {
          this.turmaForm.patchValue(data);
        });
      }
    });
  }

  onSubmit() {
    if (this.turmaForm.valid) {
      if (this.turmaId) {
        this.turmaService.updateTurma({ id: this.turmaId, ...this.turmaForm.value }).subscribe(() => {
          this.router.navigate(['/turmas']);
        });
      } else {
        this.turmaService.addTurma(this.turmaForm.value).subscribe(() => {
          this.router.navigate(['/turmas']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/turmas']);
  }
}
