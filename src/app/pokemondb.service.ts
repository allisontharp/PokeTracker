import { Injectable } from '@angular/core';
import * as localforage from "localforage";
import { sign } from 'crypto';
import { merge } from 'rxjs';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();
import { LocalforageService } from './localforage.service';
import { createInflate } from 'zlib';
import gameJson from "../assets/game_regions.json";

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


  

  async getGameDatabase(game: string, allPokemon: any){
    console.log(`getGameDatabase(${game}) called.`)
    var db = localforage.createInstance({name:game});

    // check if data exists in the database
    var rows = await this.lf.getAllRecordsFromDatabase(game);
    if(rows.length == 0){ // need to populate the database
      console.log(`Populating db ${game}.`)
      rows = await this.setGameDatabase(game, allPokemon, db);
    }

    return rows;
  }

  async setGameDatabase(game: any, allPokemon: any, db: any){
    game = game.replace('-', ' ');
    var gameRow = gameJson.filter(gameGroup => gameGroup.versions.some(v => v.name == game)); // TODO: Make this case insensitive
    var pokedex = gameRow[0].pokedexes;
    console.log(pokedex);
    var pokemonInGame;
    pokedex.forEach(dex => {
      pokemonInGame = allPokemon.filter(d => d.pokedexNumbers.some(c => c.pokedex.name == dex.name));
      pokemonInGame.forEach(mon => {
        var numberRegional = mon.pokedexNumbers.filter(i=>i.pokedex.name == dex.name)[0].entry_number;
        var p = {
          name: mon.species.name,
          game: game,
          caught: false,
          favorite: false,
          numberNational: mon.number,
          numberRegional: numberRegional,
          types: mon.types,
          string: mon.string + numberRegional
        }
        db.setItem(mon.number, p);
      });
    });

    return pokemonInGame;
  }

  async updateSinglePokemon(pokemonNumber, Game, isCaught, isFavorite){
    console.log(`pokemonDb.updateSinglePokemon(${pokemonNumber}, ${Game}, ${isCaught}, ${isFavorite}) called.`)
    
    var db = await localforage.createInstance({name: Game});
    
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
