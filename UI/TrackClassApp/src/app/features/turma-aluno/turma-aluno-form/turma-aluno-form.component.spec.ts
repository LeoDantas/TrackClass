import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaAlunoFormComponent } from './turma-aluno-form.component';

describe('TurmaAlunoFormComponent', () => {
  let component: TurmaAlunoFormComponent;
  let fixture: ComponentFixture<TurmaAlunoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurmaAlunoFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurmaAlunoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
