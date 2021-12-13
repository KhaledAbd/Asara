/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RetreiveBillComponent } from './retreive-bill.component';

describe('RetreiveBillComponent', () => {
  let component: RetreiveBillComponent;
  let fixture: ComponentFixture<RetreiveBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetreiveBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetreiveBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
