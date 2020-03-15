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
  GameName: string;
  numberNational;
  pokemon;


  constructor(
    private route: ActivatedRoute,
    private pokemonDb: PokemondbService
  ) { }

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      this.GameName = params['id']; 
      this.numberNational = params['numberNational'];
    });

    var mon = allPokemon.filter(i=>i.number == this.numberNational);
  }

}
