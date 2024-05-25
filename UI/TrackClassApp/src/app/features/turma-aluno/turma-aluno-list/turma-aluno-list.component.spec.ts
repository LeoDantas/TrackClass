import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurmaAlunoListComponent } from './turma-aluno-list.component';

describe('TurmaAlunoListComponent', () => {
  let component: TurmaAlunoListComponent;
  let fixture: ComponentFixture<TurmaAlunoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurmaAlunoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TurmaAlunoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
