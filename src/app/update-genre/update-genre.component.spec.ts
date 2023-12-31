import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGenreComponent } from './update-genre.component';

describe('UpdateGenreComponent', () => {
  let component: UpdateGenreComponent;
  let fixture: ComponentFixture<UpdateGenreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateGenreComponent]
    });
    fixture = TestBed.createComponent(UpdateGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
