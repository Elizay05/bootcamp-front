import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button text correctly', () => {
    const text = 'Submit';
    component.text = text;
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.innerText.trim()).toBe(text);
  });
  
  it('should apply primary class when primary is true', () => {
    component.primary = true;
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.classList.contains('button--primary')).toBe(true);
  });
});
