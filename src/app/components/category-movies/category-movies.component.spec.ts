import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CategoryMovies} from './category-movies.component';

describe('Category', () => {
  let component: CategoryMovies;
  let fixture: ComponentFixture<CategoryMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMovies]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CategoryMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
