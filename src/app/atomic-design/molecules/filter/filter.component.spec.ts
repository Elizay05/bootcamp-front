import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrobdownComponent } from './filter.component';

describe('DrobdownComponent', () => {
  let component: DrobdownComponent;
  let fixture: ComponentFixture<DrobdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrobdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrobdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
