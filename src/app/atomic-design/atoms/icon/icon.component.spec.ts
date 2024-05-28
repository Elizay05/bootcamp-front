import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IconComponent } from "./icon.component";


describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent],
    }).compileComponents(); 

    fixture = TestBed.createComponent(IconComponent);
    component = TestBed.createComponent(IconComponent).componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});