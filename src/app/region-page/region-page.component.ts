import { Component, OnInit } from '@angular/core';
import * as localforage from "localforage";
import { ActivatedRoute } from '@angular/router';

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

    var pokeDb = await localforage.createInstance({name: "pokemon"});
    // pokeDb.clear();
    var regionDb = await localforage.createInstance({name: this.regionName})
    // regionDb.clear()
    
    var allPokemon = await this.pokemonDb.getAllRecordsFromDatabase("pokemon");

    // TODO: Add spinning/loading icon for this
    if(allPokemon.length == 0){
      console.log(`Populating PokemonDB..`)
      var pokemonSpeciesList = await this.pokemonDb.getAllPokemonSpecies();
      await this.pokemonDb.getAllPokemonFromSpeciesList(pokemonSpeciesList);
    }

    this.pokemon = await this.pokemonDb.getRegionDatabase(this.regionName, allPokemon);
    console.log(`RegionPokemon (${this.regionName}):`)
    // console.log(this.pokemon);
    console.log(this.pokemon.filter(i=>i.name ==="treecko"))

  } // ngOnInit()

  

}
