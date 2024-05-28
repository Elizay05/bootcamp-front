import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionAsideComponent } from './option-aside.component';

describe('OptionsAsideComponent', () => {
  let component: OptionAsideComponent;
  let fixture: ComponentFixture<OptionAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionAsideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
