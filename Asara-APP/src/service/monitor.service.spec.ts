/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MonitorService } from './monitor.service';

describe('Service: Monitor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonitorService]
    });
  });

  it('should ...', inject([MonitorService], (service: MonitorService) => {
    expect(service).toBeTruthy();
  }));
});
