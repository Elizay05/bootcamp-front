import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacitiesComponent } from './capacities.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CapacitiesComponent', () => {
  let component: CapacitiesComponent;
  let fixture: ComponentFixture<CapacitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapacitiesComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  
    fixture = TestBed.createComponent(CapacitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});