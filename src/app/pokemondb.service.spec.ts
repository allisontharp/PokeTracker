import { TestBed } from '@angular/core/testing';

import { PokemondbService } from './pokemondb.service';

describe('PokemondbService', () => {
  let service: PokemondbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemondbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
