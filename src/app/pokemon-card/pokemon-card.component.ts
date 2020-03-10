import { Component, OnInit, Input } from '@angular/core';
import { PokemondbService } from '../pokemondb.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input()
  pokemon: any;
  
  constructor(
    public pokemonDb: PokemondbService
  ) { }

  ngOnInit(): void {
  }

  async updateSinglePokemon(pokemonNumber, region, isCaught, isFavorite){
    console.log(`favoriteicon.updateSinglePokemon(${pokemonNumber}, ${region}, ${isCaught}, ${isFavorite}) called.`);
    this.pokemon.favorite = isFavorite;

    await this.pokemonDb.updateSinglePokemon(pokemonNumber, region, isCaught, isFavorite);
  }

}
