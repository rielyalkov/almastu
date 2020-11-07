import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevizComponent } from './deviz.component';

describe('DevizComponent', () => {
  let component: DevizComponent;
  let fixture: ComponentFixture<DevizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
