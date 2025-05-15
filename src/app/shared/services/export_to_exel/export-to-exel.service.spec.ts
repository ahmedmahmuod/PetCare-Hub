import { TestBed } from '@angular/core/testing';

import { ExportToExelService } from './export-to-exel.service';

describe('ExportToExelService', () => {
  let service: ExportToExelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportToExelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
