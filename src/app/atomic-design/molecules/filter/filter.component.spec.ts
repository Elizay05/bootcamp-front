import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SimpleChange, SimpleChanges } from '@angular/core';
import { FilterComponent } from './filter.component';
import { MoleculesModule } from '../molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { ICONS } from 'src/app/util/icons.constants';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterComponent],
      imports: [MoleculesModule, AtomsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update initialDropdownSize on initialPageSize change', () => {
    spyOn(component, 'updateInitialDropdownSize').and.callThrough();
    component.initialPageSize = 50;
    const change: SimpleChanges = {
      initialPageSize: new SimpleChange(null, component.initialPageSize, true)
    };
    component.ngOnChanges(change);
  
    expect(component.updateInitialDropdownSize).toHaveBeenCalledWith('50 por página');
    expect(component.initialDropdownSize).toBe('50 por página');
  });

  it('should update initialDropdownOrderBy on initialOrderBy change', () => {
    component.optionsOrderBy = { 'fecha inicio': true, 'cupo máximo': false };
    spyOn(component, 'getOrderKeyByValue').and.callThrough();

    component.initialOrderBy = false;
    const changes = {
      initialOrderBy: new SimpleChange(null, component.initialOrderBy, true)
    }
    component.ngOnChanges(changes);

    expect(component.getOrderKeyByValue).toHaveBeenCalledWith(false);
    expect(component.initialDropdownOrderBy).toBe('cupo máximo');
  });

  it('should update initialDropdownOrderBy on updateInitialDropdownOrderBy', () => {
    component.optionsOrderBy = { 'fecha inicio': true, 'cupo máximo': false };
    const newText = 'cupo máximo';
    
    component.updateInitialDropdownOrderBy(newText);
    
    expect(component.initialDropdownOrderBy).toBe(newText);
    
    component.orderByChange.subscribe((value) => {
      expect(value).toBe(false);
    });
  });

  it('should update icon_arrows and emit ascendingChange event', () => {
    spyOn(component.ascendingChange, 'emit');
  
    component.icon_arrows = ICONS.ARROWS_UP;
    component.updateButtonIcon();
  
    expect(component.icon_arrows).toBe(ICONS.ARROWS_DOWN);
  
    expect(component.ascendingChange.emit).toHaveBeenCalledWith(false);
  
    component.updateButtonIcon();
  
    expect(component.icon_arrows).toBe(ICONS.ARROWS_UP);
  
    expect(component.ascendingChange.emit).toHaveBeenCalledWith(true);
  });
});