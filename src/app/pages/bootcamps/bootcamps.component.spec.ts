import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BootcampsComponent } from './bootcamps.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BootcampsComponent', () => {
  let component: BootcampsComponent;
  let fixture: ComponentFixture<BootcampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BootcampsComponent],
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(BootcampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});