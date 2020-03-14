import { Component, OnInit } from '@angular/core';
import * as localforage from "localforage";
import { PokemondbService } from '../pokemondb.service';
import allPokemon from "../../assets/pokemon.json"

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
  oras;
  letsgo;
  loadingComplete = false;
  GamesTracked = ["updated-hoenn", "kanto"];
  Games = new Array;

  constructor(
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    
    this.GamesTracked.forEach(async r => {
      var GameName = r.replace('updated-', '');
      var GameDb = await this.pokemonDb.getGameDatabase(r, allPokemon);
      var Game = {
        GameName: GameName,
        name: r,
        total: GameDb.length,
        caught: GameDb.filter(i=>i.caught == true).length,
        favorite: GameDb.filter(i=>i.favorite == true).length
      }
      this.Games.push(Game);
      
    });
    var s= allPokemon.filter(d => d.pokedexNumbers.some(c => c.pokedex.name == "kanto"));
    console.log(s)
    console.log(allPokemon)

    this.loadingComplete = true;

  }

}
