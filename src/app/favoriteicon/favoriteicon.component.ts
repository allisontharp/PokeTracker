import { Component, OnInit, Input } from '@angular/core';
import { PokemondbService } from '../pokemondb.service';



@Component({
  selector: 'app-favoriteicon',
  templateUrl: './favoriteicon.component.html',
  styleUrls: ['./favoriteicon.component.css']
})
export class FavoriteiconComponent implements OnInit {

  @Input()
    pokemon: any;

  constructor(
    public pokemonDb: PokemondbService
  ) {
    console.log('favoriteIconComponent called.')
   }

  ngOnInit(): void {
  }

  async updateSinglePokemon(pokemonNumber, region, isCaught, isFavorite){
    console.log(`favoriteicon.updateSinglePokemon(${pokemonNumber}, ${region}, ${isCaught}, ${isFavorite}) called.`);
    this.pokemon.favorite = isFavorite;

    await this.pokemonDb.updateSinglePokemon(pokemonNumber, region, isCaught, isFavorite);
  }

}
