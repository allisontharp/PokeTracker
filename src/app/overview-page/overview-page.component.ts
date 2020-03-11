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
  regionsTracked = ["hoenn", "kanto"];
  regions = new Array;

  constructor(
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    
    this.regionsTracked.forEach(async r => {
      var regionDb = await this.pokemonDb.getRegionDatabase(r, allPokemon);
      var region = {
        name: r,
        total: regionDb.length,
        caught: regionDb.filter(i=>i.caught == true).length,
        favorite: regionDb.filter(i=>i.favorite == true).length
      }
      this.regions.push(region);
      
    });
    var s= allPokemon.filter(d => d.pokedexNumbers.some(c => c.pokedex.name == "kanto"));
    console.log(s)

    this.loadingComplete = true;

  }

}
