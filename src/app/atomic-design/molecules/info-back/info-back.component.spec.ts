import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBackComponent } from './info-back.component';
import { icons } from 'src/app/util/icons.enum';
import { By } from '@angular/platform-browser';
import { MoleculesModule } from '../molecules.module';
import { AtomsModule } from '../../atoms/atoms.module';

describe('InfoBackComponent', () => {
  let component: InfoBackComponent;
  let fixture: ComponentFixture<InfoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBackComponent ],
      imports: [
        MoleculesModule, AtomsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBackComponent);
    component = fixture.componentInstance;
    component.icon_three_points = icons.THREE_POINTS; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set text correctly', () => {
    const text = 'Sample Text';
    component.text = text;
    fixture.detectChanges();
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('.section__information__title');
    expect(titleElement.textContent).toContain(text);
  });

  it('should set description correctly', () => {
    const description = 'Sample Description';
    component.description = description;
    fixture.detectChanges();
    const descriptionElement: HTMLElement = fixture.nativeElement.querySelector('.section__information__description');
    expect(descriptionElement.textContent).toContain(description);
  });

  /*it('should set icon_three_points correctly', () => {
    const description = 'Sample Description';
    const text = 'Sample Text';
    component.text = text;
    component.description = description;
    component.icon_three_points = icons.THREE_POINTS;
    fixture.detectChanges();
  
    // Obtener el componente molecule-button-icon
    const buttonIconComponent = fixture.debugElement.query(By.css('molecule-button-icon'));
    
    expect(buttonIconComponent).toBeTruthy();
  
    const iconAttribute = buttonIconComponent.attributes['icon'];
  
    expect(iconAttribute).toEqual(icons.THREE_POINTS);
  });*/
});
