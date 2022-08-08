import { TestBed } from '@angular/core/testing';

import { FlashcardImageUploaderService } from './flashcard-image-uploader.service';

describe('FlashcardImageUploaderService', () => {
  let service: FlashcardImageUploaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashcardImageUploaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
