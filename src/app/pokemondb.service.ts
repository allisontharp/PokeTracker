import { Injectable } from '@angular/core';
import * as localforage from "localforage";
import { sign } from 'crypto';
import { merge } from 'rxjs';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();
import { LocalforageService } from './localforage.service';
import { createInflate } from 'zlib';

@Injectable({
  providedIn: 'root'
})
export class PokemondbService {

  constructor(
    private lf: LocalforageService
  ) { }

  async getAllPokemonSpecies(){
    var pokemonSpecies = await P.getPokemonSpeciesList();
    var pSpeciesList = new Array;

    pokemonSpecies.results.forEach(p => {
      pSpeciesList.push(p.name);
    });

    return pSpeciesList;
  }

  async getAllPokemonFromSpeciesList(pokemonSpeciesList: Array<string>){
    console.log(pokemonSpeciesList)
    // split array into array of arrays (so we don't call the API as many times)
    var arraySize = 100;
    var arrayOfSpeciesList = [];
    for (var i = 0; i<pokemonSpeciesList.length; i += arraySize){
      arrayOfSpeciesList.push(pokemonSpeciesList.slice(i, i+arraySize));
    }


    arrayOfSpeciesList.forEach(async a => {
      console.log(a);
      var speciesByName = await P.getPokemonSpeciesByName(a);
      var pokemonNumbers = new Array;
      speciesByName.forEach(e => {
        pokemonNumbers.push(e.id);
      });
      var pokemonByName = await P.getPokemonByName(pokemonNumbers);
      
      pokemonByName.forEach(async p => {
        var id = p.id;
        console.log(`${id} - ${p.name}`)
        var s = speciesByName.filter(i => i.id === id)[0];
        var pokemonData = {
          name: p.name,
          number: p.id,
          gameIndices: p.game_indices,
          species: p.species,
          sprites: p.sprites,
          types: p.types,
          evolutionChain: s.evolution_chain,
          pokedexNumbers: s.pokedex_numbers
        }

        var typeNames = "";
        p.types.forEach(t => {
          typeNames += t.type.name
        });

        var pokemonDataString = p.name + p.id + typeNames

        var pokemonDataWithString = {
          name: p.name,
          number: p.id,
          gameIndices: p.game_indices,
          species: p.species,
          sprites: p.sprites,
          types: p.types,
          evolutionChain: s.evolution_chain,
          pokedexNumbers: s.pokedex_numbers,
          string: pokemonDataString
        }
        
        await this.lf.setDatabaseRow("pokemon", id, pokemonDataWithString);
      });

    })
  }


  async getAllRecordsFromDatabase(dbName: string){
    var db = localforage.createInstance({name: dbName});
    var rows = new Array;
    await db.iterate(function(value, key, iterationNumber) {
      rows.push(value);
    });

    console.log(`${dbName} Length: ${rows.length}`)

    return rows;
  }

  async getRegionDatabase(region: string, allPokemon: any){
    console.log(`getRegionDatabase(${region}) called.`)
    var db = localforage.createInstance({name:region});

    // check if data exists in the database
    var rows = await this.getAllRecordsFromDatabase(region);
    if(rows.length == 0){ // need to populate the database
      console.log(`Populating db ${region}.`)
      rows = await this.setRegionDatabase(region, allPokemon, db);
    }

    return rows;
  }

  async setRegionDatabase(region: any, allPokemon: any, db: any){
    console.log(`setRegionDatabase(${region}) called.`)
    
    var pokemonInRegion = allPokemon.filter(d => d.pokedexNumbers.some(c => c.pokedex.name == region));
    pokemonInRegion.forEach(mon => {
      var numberRegional = mon.pokedexNumbers.filter(i=>i.pokedex.name == region)[0].entry_number;
      var p = {
        name: mon.species.name,
        region: region,
        caught: false,
        favorite: false,
        numberNational: mon.number,
        numberRegional: numberRegional,
        types: mon.types,
        string: mon.string + numberRegional
      }
      db.setItem(mon.number, p);
    });

    return pokemonInRegion;
  }

  async updateSinglePokemon(pokemonNumber, region, isCaught, isFavorite){
    console.log(`pokemonDb.updateSinglePokemon(${pokemonNumber}, ${region}, ${isCaught}, ${isFavorite}) called.`)
    
    var db = await localforage.createInstance({name: region});
    
    var item = {
      caught: isCaught,
      favorite: isFavorite
    };

    item = await db.getItem(pokemonNumber);
    item.caught = isCaught;
    item.favorite = isFavorite;

    db.setItem(pokemonNumber, item);
    

  }


}
