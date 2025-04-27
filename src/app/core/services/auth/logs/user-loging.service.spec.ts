import { TestBed } from '@angular/core/testing';

import { UserLogingService } from './user-loging.service';

describe('UserLogingService', () => {
  let service: UserLogingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLogingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
