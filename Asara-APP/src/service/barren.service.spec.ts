/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BarrenService } from './barren.service';

describe('Service: Barren', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarrenService]
    });
  });

  it('should ...', inject([BarrenService], (service: BarrenService) => {
    expect(service).toBeTruthy();
  }));
});
