/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListStockBillComponent } from './list-stock-bill.component';

describe('ListStockBillComponent', () => {
  let component: ListStockBillComponent;
  let fixture: ComponentFixture<ListStockBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStockBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
