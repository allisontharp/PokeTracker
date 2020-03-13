import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemondbService } from '../pokemondb.service';
import allPokemon from "../../assets/pokemon.json"

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  private sub: any;
  regionName: string;
  numberNational;
  pokemon;


  constructor(
    private route: ActivatedRoute,
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.regionName = params['id']; 
      this.numberNational = params['numberNational'];
    });

    // this.pokemon = await this.pokemonDb.getRegionDatabase(this.regionName, allPokemon);

    
    // console.log(`Region:${this.regionName} Number: ${this.numberNational}`)
    // console.log(this.pokemon)
    // var mon = this.pokemon.filter(i=> i.numberRegional == this.numberNational);
    // console.log(mon);

    var mon = allPokemon.filter(i=>i.number == this.numberNational);
    console.log(mon);

    console.log(allPokemon);
  }

}
