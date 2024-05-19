import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesComponent } from './technologies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TechnologyService } from 'src/app/services/technology/technology.service';

describe('TechnologiesComponent', () => {
  let component: TechnologiesComponent;
  let fixture: ComponentFixture<TechnologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologiesComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ TechnologyService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
