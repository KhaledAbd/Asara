/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { alertifyService } from './alertify.service';

describe('Service: alertify', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [alertifyService]
    });
  });

  it('should ...', inject([alertifyService], (service: alertifyService) => {
    expect(service).toBeTruthy();
  }));
});
