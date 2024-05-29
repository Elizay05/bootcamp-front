import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoBackComponent } from './info-back.component';

describe('InfoBackComponent', () => {
  let component: InfoBackComponent;
  let fixture: ComponentFixture<InfoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit navigateSection onSectionClick', () => {
    spyOn(component.navigateSection, 'emit');
    component.onSectionClick();
    expect(component.navigateSection.emit).toHaveBeenCalled();
  });

  it('should emit navigateButton onButtonClick', () => {
    spyOn(component.navigateButton, 'emit');
    component.onButtonClick();
    expect(component.navigateButton.emit).toHaveBeenCalled();
  })
});