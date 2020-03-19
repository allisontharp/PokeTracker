import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import allPokemon from "../../assets/pokemon.json"
import allTypes from "../../assets/types.json"

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  @Input()
  numberNational;
  private sub: any;
  GameName: string;
  pokemonName;
  monTypes: any;
  monMultipliers: any;


  constructor(
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    // this.sub = this.route.params.subscribe(params => {
    //   this.GameName = params['id']; 
    //   this.numberNational = params['numberNational'];
    // });
    this.GameName = 'Sword';

    this.monTypes = new Array;

    var mon = allPokemon.filter(i=>i.number == this.numberNational)[0];
    this.pokemonName = mon.name;

    mon.types.forEach(t => {
      var typeDetails = allTypes.filter(d => d.name == t.type.name)[0]
      var details = typeDetails;
      details['slot'] = t.slot
      this.monTypes.push(details);
    });

    this.monMultipliers = this.getWeaknesses();
    
  }

  getWeaknesses(){
    var typeMultiplier = new Array;
    this.monTypes.forEach(typeName => {
      var slot = typeName.slot;
      allTypes.forEach(type => {
        var multiplier = 1;
        if(type.strengths.indexOf(typeName.name) >=0){ 
          multiplier = 2
        } else if(type.weaknesses.indexOf(typeName.name) >=0) { 
          multiplier = 0.5
        } else if(type.immunes.indexOf(typeName.name) >=0){
          multiplier = 0
        }

        var currentType = typeMultiplier.filter(t => t.name == type.name)
        if(currentType.length == 0)
        {
          typeMultiplier.push({"name": type.name, "multiplier": multiplier,})
        }
        else{
          currentType[0]['multiplier'] = currentType[0]['multiplier'] * multiplier;
        }
        var category;
        currentType = typeMultiplier.filter(t => t.name == type.name)

        if(currentType[0]['multiplier'] == 0){
          category = 'immune'
        }else if (currentType[0]['multiplier'] == 1){
          category = 'normal'
        }
        else if (currentType[0]['multiplier'] > 1){
          category = 'weak'
        }else if(currentType[0]['multiplier'] < 1){
          category = 'resistant'
        }
        currentType[0]['category'] = category;
      });
    });

    // console.log('Damaged Normally By:')
    // console.log(typeMultiplier.filter(f => f.multiplier == 1))
    // console.log('Weak to:')
    // console.log(typeMultiplier.filter(f => f.multiplier > 1))

    // console.log('Immune to:')
    // console.log(typeMultiplier.filter(f => f.multiplier == 0))

    // console.log('Resistant to:')
    // console.log(typeMultiplier.filter(f => f.multiplier < 1))

    return typeMultiplier;
  }
}
