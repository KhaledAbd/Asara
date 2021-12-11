/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BarrenItemDailyComponent } from './barren-item-daily.component';

describe('BarrenItemDailyComponent', () => {
  let component: BarrenItemDailyComponent;
  let fixture: ComponentFixture<BarrenItemDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrenItemDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrenItemDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
