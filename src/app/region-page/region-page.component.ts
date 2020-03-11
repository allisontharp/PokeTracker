import { Component, OnInit } from '@angular/core';
import * as localforage from "localforage";
import { ActivatedRoute } from '@angular/router';
// import { FormsModule } from '@angular/forms';
import allPokemon from "../../assets/pokemon.json"

const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

import {PokemondbService} from "../pokemondb.service"
@Component({
  selector: 'app-region-page',
  templateUrl: './region-page.component.html',
  styleUrls: ['./region-page.component.css']
})
export class RegionPageComponent implements OnInit {
  private sub: any;
  regionName: string;
  pokemon;
  isCaught;
  isFavorite;
  searchText;
  searchNumber;

  constructor(
    private route: ActivatedRoute,
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.regionName = params['id']; 
    });

    this.pokemon = await this.pokemonDb.getRegionDatabase(this.regionName, allPokemon);
  } // ngOnInit()

  setFilterStatus(filterName: string, status: any){
    console.log(`${filterName} status: ${status}`);
    if(filterName == "caught"){
      this.isCaught = status;
    }
    else if(filterName == "favorite"){
      this.isFavorite = status
    }
  }
  

}
