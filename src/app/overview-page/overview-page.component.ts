import { Component, OnInit } from '@angular/core';
import * as localforage from "localforage";
import { PokemondbService } from '../pokemondb.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css']
})
export class OverviewPageComponent implements OnInit {
  oras;
  letsgo;
  loadingComplete = false;

  constructor(
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log(this.loadingComplete);
    var pokeDb = await localforage.createInstance({name: "pokemon"});
    var allPokemon = await this.pokemonDb.getAllRecordsFromDatabase("pokemon");

    // TODO: Add spinning/loading icon for this
    if(allPokemon.length == 0){
      console.log(`Populating PokemonDB..`)
      var pokemonSpeciesList = await this.pokemonDb.getAllPokemonSpecies();
      await this.pokemonDb.getAllPokemonFromSpeciesList(pokemonSpeciesList);
      this.loadingComplete = true;
    }else{
      this.loadingComplete = true;
    }
    console.log(this.loadingComplete);

    var orasDb = await this.pokemonDb.getRegionDatabase("hoenn", allPokemon)
    var letsgoDb = await this.pokemonDb.getRegionDatabase("kanto", allPokemon);
    
    this.oras = {
      total: orasDb.length,
      caught: orasDb.filter(i=>i.caught == true).length,
      favorite: orasDb.filter(i=>i.favorite == true).length
    }
    console.log(this.oras);

    this.letsgo = {
      total: letsgoDb.length,
      caught: letsgoDb.filter(i=>i.caught == true).length,
      favorite: letsgoDb.filter(i=>i.favorite == true).length
    }

  }

}
