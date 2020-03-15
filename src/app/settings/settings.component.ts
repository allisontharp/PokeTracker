import { Component, OnInit } from '@angular/core';
import { LocalforageService } from '../localforage.service';
import gameJson from "../../assets/game_regions.json"


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  allGames;
  sortByName = 'name';
  gamesToTrack;

  constructor(
    private lf: LocalforageService
  ) { }

  async ngOnInit(): Promise<void> {
    this.allGames = gameJson;
    this.gamesToTrack = await this.lf.getAllRecordsFromDatabase("gamesToTrack");
    if(this.gamesToTrack.length == 0){
      this.setGameTrackingDatabase();
    }
    this.gamesToTrack = await this.lf.getAllRecordsFromDatabase("gamesToTrack");
  }

  async setGameTrackingDatabase(){
    this.allGames.forEach(gameGroup => {
      gameGroup.versions.forEach(game => {
        var p = {
          gameName: game.name,
          gameGroupName: gameGroup.name,
          generation: gameGroup.generation,
          pokedexes: gameGroup.pokedexes,
          regions: gameGroup.regions,
          track: false
        }

        this.lf.setDatabaseRow("gamesToTrack", p.gameName, p)
        
      });
    });
  }

  async getGameTrackingDatabase(){
  }

  async deleteDatabase(databaseName){
    await this.lf.deleteDatabase(databaseName);
  }
}
