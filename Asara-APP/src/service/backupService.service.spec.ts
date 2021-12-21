/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BackupServiceService } from './backupService.service';

describe('Service: BackupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackupServiceService]
    });
  });

  it('should ...', inject([BackupServiceService], (service: BackupServiceService) => {
    expect(service).toBeTruthy();
  }));
});
