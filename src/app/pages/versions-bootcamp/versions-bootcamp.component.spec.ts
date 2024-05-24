import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsBootcampComponent } from './versions-bootcamp.component';

describe('VersionsBootcampComponent', () => {
  let component: VersionsBootcampComponent;
  let fixture: ComponentFixture<VersionsBootcampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionsBootcampComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionsBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
