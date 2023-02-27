import { TestBed } from '@angular/core/testing';

import { UserMovieListService } from './user-movie-list.service';

describe('UserMovieListService', () => {
  let service: UserMovieListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMovieListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
