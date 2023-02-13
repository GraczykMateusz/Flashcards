import { TestBed } from '@angular/core/testing';

import { FlashcardsRandomizerService } from './flashcards-randomizer.service';

describe('FlashcardsRandomizerService', () => {
  let service: FlashcardsRandomizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardsRandomizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
