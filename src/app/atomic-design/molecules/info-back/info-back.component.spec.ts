import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBackComponent } from './info-back.component';

describe('InfoBackComponent', () => {
  let component: InfoBackComponent;
  let fixture: ComponentFixture<InfoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
