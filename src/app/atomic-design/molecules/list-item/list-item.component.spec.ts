import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { Router } from '@angular/router';
import { MoleculesModule } from '../molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemComponent ],
      imports: [MoleculesModule, AtomsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListItemComponent);
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