import { Component, OnInit, Input } from '@angular/core';
import { PokemondbService } from '../pokemondb.service';
import colorsTypes from "../../assets/colors_types.json"

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
    console.log(`pokemonCard.updateSinglePokemon(${pokemonNumber}, ${region}, ${isCaught}, ${isFavorite}) called.`);
    this.pokemon.favorite = isFavorite;
    this.pokemon.caught = isCaught;

    await this.pokemonDb.updateSinglePokemon(pokemonNumber, region, isCaught, isFavorite);
  }
}
