import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionAsideComponent } from './option-aside.component';
import { Router } from '@angular/router';
import { MoleculesModule } from '../molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('OptionsAsideComponent', () => {
  let component: OptionAsideComponent;
  let fixture: ComponentFixture<OptionAsideComponent>;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionAsideComponent ],
      imports: [MoleculesModule, AtomsModule, RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionAsideComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to route on click NavigateTo', () => {
    spyOn(router, 'navigate');
    component.navigateTo('/route');
    expect(router.navigate).toHaveBeenCalledWith(['/route']);
  })
});
