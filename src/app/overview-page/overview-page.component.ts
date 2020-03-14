import { Component, OnInit } from '@angular/core';
import * as localforage from "localforage";
import { PokemondbService } from '../pokemondb.service';
import allPokemon from "../../assets/pokemon.json"
import { LocalforageService } from '../localforage.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
  oras;
  letsgo;
  loadingComplete = false;
  gamesToTrack;
  Games = new Array;

  constructor(
    private pokemonDb: PokemondbService,
    private lf: LocalforageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.gamesToTrack = await this.lf.getAllRecordsFromDatabase("gamesToTrack");
    this.gamesToTrack = this.gamesToTrack.filter(g => g.track == true);
    this.gamesToTrack.forEach(async r => {
      var GameDb = await this.pokemonDb.getGameDatabase(r.gameName, allPokemon);
      var Game = {
        GameName: r.gameName,
        name: r.gameName,
        total: GameDb.length,
        caught: GameDb.filter(i=>i.caught == true).length,
        favorite: GameDb.filter(i=>i.favorite == true).length
      }
      this.Games.push(Game);
      
    });

    this.loadingComplete = true;

  }

}
