import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { icons } from 'src/app/util/icons.enum';

describe('DrobdownComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize default dropdown text', () => {
    expect(component.initialDropdownText).toBe('10 por página');
  });
  
  it('should initialize default icons', () => {
    expect(component.icon_arrows).toBe(icons.ARROWS_UP);
  });
  
  it('should initialize default pagination options', () => {
    expect(component.optionsPagination).toEqual(['10 por página', '25 por página', '50 por página']);
  });

  it('should update dropdown button text when an option is clicked', () => {
    const newText = '25 por página';
    component.updateButtonText(newText);
    expect(component.initialDropdownText).toBe(newText);
  });
  
  it('should emit size change event when an option is clicked', () => {
    spyOn(component.sizeChange, 'emit');
    const newText = '25 por página';
    component.updateButtonText(newText);
    expect(component.sizeChange.emit).toHaveBeenCalledWith(25);
  });
  
  it('should update button icon when clicked', () => {
    const initialIcon = component.icon_arrows;
    component.updateButtonIcon();
    expect(component.icon_arrows).not.toBe(initialIcon);
  });
  
  it('should emit ascending change event when clicked', () => {
    spyOn(component.ascendingChange, 'emit');
    component.updateButtonIcon();
    expect(component.ascendingChange.emit).toHaveBeenCalled();
  });
});
