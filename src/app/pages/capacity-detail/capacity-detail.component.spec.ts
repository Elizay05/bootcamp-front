import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacityDetailComponent } from './capacity-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CapacityDetailComponent', () => {
  let component: CapacityDetailComponent;
  let fixture: ComponentFixture<CapacityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapacityDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CapacityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
