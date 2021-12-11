/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RetreiveStockBillComponent } from './retreive-stock-bill.component';

describe('RetreiveStockBillComponent', () => {
  let component: RetreiveStockBillComponent;
  let fixture: ComponentFixture<RetreiveStockBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetreiveStockBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetreiveStockBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
