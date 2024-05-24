import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVersionComponent } from './form-version.component';

describe('FormVersionComponent', () => {
  let component: FormVersionComponent;
  let fixture: ComponentFixture<FormVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVersionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
