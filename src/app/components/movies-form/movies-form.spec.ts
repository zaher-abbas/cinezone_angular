import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesForm } from './movies-form';

describe('MoviesForm', () => {
  let component: MoviesForm;
  let fixture: ComponentFixture<MoviesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
