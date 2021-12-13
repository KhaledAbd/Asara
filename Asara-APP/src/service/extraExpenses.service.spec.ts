/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExtraExpensesService } from './extraExpenses.service';

describe('Service: ExtraExpenses', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExtraExpensesService]
    });
  });

  it('should ...', inject([ExtraExpensesService], (service: ExtraExpensesService) => {
    expect(service).toBeTruthy();
  }));
});
