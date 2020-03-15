import { Component, OnInit } from '@angular/core';
import * as localforage from "localforage";
import { ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import allPokemon from "../../assets/pokemon.json"

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

import {PokemondbService} from "../pokemondb.service"
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
  private sub: any;
  GameName: string;
  dbName: string;
  pokemon;
  isCaught;
  isFavorite;
  searchText;
  searchNumber;
  sortByName = 'name';

  constructor(
    private route: ActivatedRoute,
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.dbName = params['id'];
      this.GameName = this.dbName.replace('updated-',''); 
    });

    this.pokemon = await this.pokemonDb.getGameDatabase(this.dbName, allPokemon);

  } // ngOnInit()

  setFilterStatus(filterName: string, status: any){
    if(filterName == "caught"){
      this.isCaught = status;
    }
    else if(filterName == "favorite"){
      this.isFavorite = status
    }
  }

  setSortByName(sortByName: any){
    console.log(`setSortByName(${sortByName}) called.`)
    this.sortByName = sortByName;
    this.pokemon = this.sortBy();
  }

  sortBy() {
    this.pokemon.sort((a, b) => a[this.sortByName] > b[this.sortByName] ? 1 : a[this.sortByName] === b[this.sortByName] ? 0 : -1);
    return this.pokemon
  }
  

}
