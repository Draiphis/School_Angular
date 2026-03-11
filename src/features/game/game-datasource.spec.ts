import { TestBed } from '@angular/core/testing';

import { GameDatasource } from './game-datasource';

describe('GameDatasource', () => {
  let service: GameDatasource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDatasource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
