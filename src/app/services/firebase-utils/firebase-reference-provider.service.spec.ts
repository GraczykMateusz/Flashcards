import { TestBed } from '@angular/core/testing';

import { FirebaseReferenceProvider } from './firebase-reference-provider.service';

describe('FirebaseReferenceProvider.TsService', () => {
  let service: FirebaseReferenceProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseReferenceProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
