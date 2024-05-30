import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartComponent } from './start.component';
import { OrganismsModule } from 'src/app/atomic-design/organisms/organisms.module';
import { TemplatesModule } from 'src/app/atomic-design/templates/templates.module';
import { MoleculesModule } from 'src/app/atomic-design/molecules/molecules.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartComponent ],
      imports: [RouterTestingModule, TemplatesModule, OrganismsModule, MoleculesModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
