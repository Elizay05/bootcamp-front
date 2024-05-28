import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormVersionComponent } from './form-version.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormVersionComponent', () => {
  let component: FormVersionComponent;
  let fixture: ComponentFixture<FormVersionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormVersionComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormVersionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});