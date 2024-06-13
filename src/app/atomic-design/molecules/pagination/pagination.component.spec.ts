import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { MoleculesModule } from '../molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [MoleculesModule, AtomsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct pages for totalPages <= 3', () => {
    component.totalPages = 3;
    component.currentPage = 0;
    fixture.detectChanges();

    expect(component.pages).toEqual([0, 1, 2]);
  });

  it('should return correct pages for first pages', () => {
    component.totalPages = 5;
    component.currentPage = 0;
    fixture.detectChanges();

    expect(component.pages).toEqual([0, 1, 2]);
  });

  it('should return correct pages for middle pages', () => {
    component.totalPages = 5;
    component.currentPage = 2;
    fixture.detectChanges();

    expect(component.pages).toEqual([1, 2, 3]);
  });

  it('should return correct pages for last pages', () => {
    component.totalPages = 5;
    component.currentPage = 4;
    fixture.detectChanges();

    expect(component.pages).toEqual([2, 3, 4]);
  });

  it('should call changePage with the next page number when currentPage is less than totalPages - 1', () => {
    spyOn(component, 'changePage');
    component.currentPage = 1;
    component.totalPages = 3;

    component.nextPage();

    expect(component.changePage).toHaveBeenCalledWith(2);
  });

  it('should not call changePage when currentPage is not less than totalPages - 1', () => {
    spyOn(component, 'changePage');
    component.currentPage = 2;
    component.totalPages = 3;

    component.nextPage();

    expect(component.changePage).not.toHaveBeenCalled();
  });

  it('should emit pageChange event with correct page number', () => {
    spyOn(component.pageChange, 'emit');

    component.currentPage = 2;

    component.changePage(1);

    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
    expect(component.pageChange.emit).toHaveBeenCalledWith(1);
  });

  it('should call changePage with the previous page number when currentPage is more than 0', () => {
    spyOn(component, 'changePage');
    component.currentPage = 1;

    component.prevPage();

    expect(component.changePage).toHaveBeenCalledWith(0);
  });

  it('should not call changePage when currentPage is not more than 0', () => {
    spyOn(component, 'changePage');
    component.currentPage = 0;

    component.prevPage();

    expect(component.changePage).not.toHaveBeenCalled();
  });

});