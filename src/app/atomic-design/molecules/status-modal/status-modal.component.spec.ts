import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusModalComponent } from './status-modal.component';
import { MoleculesModule } from '../molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('StatusModalComponent', () => {
  let component: StatusModalComponent;
  let fixture: ComponentFixture<StatusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusModalComponent ],
      imports: [MoleculesModule, AtomsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the modal', () => {
    spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });
});

