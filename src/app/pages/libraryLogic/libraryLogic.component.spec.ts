import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryLogicComponent } from './libraryLogic.component';

describe('LibraryComponent', () => {
  let component: LibraryLogicComponent;
  let fixture: ComponentFixture<LibraryLogicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryLogicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryLogicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
