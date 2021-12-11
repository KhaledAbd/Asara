/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BillExpensesService } from './billExpenses.service';

describe('Service: BillExpenses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillExpensesService]
    });
  });

  it('should ...', inject([BillExpensesService], (service: BillExpensesService) => {
    expect(service).toBeTruthy();
  }));
});
