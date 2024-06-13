import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconComponent } from './icon.component';
import { AtomsModule } from '../atoms.module';
import { ICONS } from 'src/app/util/icons.constants';

class MockDomSanitizer {
  bypassSecurityTrustHtml(value: string): SafeHtml {
    return value as any;
  }
}

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let sanitizer: DomSanitizer;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [IconComponent],
      imports: [AtomsModule],
      providers: [
        { provide: DomSanitizer, useClass: MockDomSanitizer }
      ]
    }).compileComponents(); 
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load SVG content', async () => {
    const svgPath = ICONS.HOME;
    const mockSvgResponse = '<svg></svg>';
    spyOn(component, 'loadSVG').and.callThrough();
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.returnValue(mockSvgResponse as any);

    component.iconName = svgPath;
    component.ngOnInit();

    expect(component.loadSVG).toHaveBeenCalled();
  });

  it('should not load SVG content for invalid path', async () => {
    const svgPath = 'invalid/path';
    spyOn(component, 'loadSVG').and.callThrough();
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.returnValue('' as any);

    component.iconName = svgPath;
    component.ngOnInit();

    expect(component.loadSVG).toHaveBeenCalled();
    expect(sanitizer.bypassSecurityTrustHtml).not.toHaveBeenCalled();
    expect(component.svgContent).toBeUndefined();
  });

  it('should call loadSVG when iconName changes', () => {
    const svgPath = ICONS.HOME;
    const mockSvgResponse = '<svg></svg>';
    spyOn(component, 'loadSVG').and.callThrough();
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.returnValue(mockSvgResponse as any);

    component.iconName = svgPath;

    component.ngOnChanges({
      iconName: {
        currentValue: svgPath,
        previousValue: null,
        isFirstChange: () => true,
        firstChange: true
      }
    });

    fixture.detectChanges();

    expect(component.loadSVG).toHaveBeenCalled();
  });
});