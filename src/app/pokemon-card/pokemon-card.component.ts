import { Component, OnInit, Input } from '@angular/core';
import { PokemondbService } from '../pokemondb.service';
import colorsTypes from "../../assets/colors_types.json"

declare var $:any;
@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  @Input()
  pokemon: any;
  pokemonNationalNumber;
  pokemonName;
  constructor(
    public pokemonDb: PokemondbService
  ) { }

  ngOnInit(): void {
    $('[data-toggle="popover"]').popover();
  }

  async updateSinglePokemon(pokemonNumber, game, isCaught, isFavorite){
    game = game.split(' ').join('-');
    console.log(`pokemonCard.updateSinglePokemon(${pokemonNumber}, ${game}, ${isCaught}, ${isFavorite}) called.`);
    this.pokemon.favorite = isFavorite;
    this.pokemon.caught = isCaught;

    await this.pokemonDb.updateSinglePokemon(pokemonNumber, game, isCaught, isFavorite);
  }

  setModalValues(pokemonName, pokemonNationalNumber){
    console.log(`setModalValues(${pokemonName}, ${pokemonNationalNumber}) called.`)
    this.pokemonNationalNumber = pokemonNationalNumber;
    this.pokemonName = pokemonName;
    console.log(`${this.pokemonName} - ${this.pokemonNationalNumber}`)
  }
}
