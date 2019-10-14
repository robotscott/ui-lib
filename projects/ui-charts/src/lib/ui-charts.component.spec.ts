import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiChartsComponent } from './ui-charts.component';

describe('UiChartsComponent', () => {
  let component: UiChartsComponent;
  let fixture: ComponentFixture<UiChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
