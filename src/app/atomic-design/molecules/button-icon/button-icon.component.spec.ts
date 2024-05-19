import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonIconComponent } from './button-icon.component';

describe('ButtonIconComponent', () => {
  let component: ButtonIconComponent;
  let fixture: ComponentFixture<ButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the button with text and icon', () => {
    component.text = 'Submit';
    component.icon = 'icon-name';
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('.button');
    expect(buttonElement.textContent).toContain('Submit');
    expect(buttonElement.querySelector('atom-icon')).toBeTruthy();
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('.button');
    expect(buttonElement.disabled).toBe(true);
  });

  it('should apply primary class when classButton is "primary"', () => {
    component.classButton = 'primary';
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('.button');
    expect(buttonElement.classList.contains('button__primary')).toBe(true);
  });
  
  it('should apply small class when text is empty', () => {
    component.text = '';
    fixture.detectChanges();
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('.button');
    expect(buttonElement.classList.contains('button__small')).toBe(true);
  });

});
