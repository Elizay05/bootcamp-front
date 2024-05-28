import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { VersionsBootcampComponent } from './versions-bootcamp.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VersionsBootcampComponent', () => {
  let component: VersionsBootcampComponent;
  let fixture: ComponentFixture<VersionsBootcampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VersionsBootcampComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => '1'
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VersionsBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});