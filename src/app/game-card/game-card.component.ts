import { Component, OnInit, Input } from '@angular/core';
import * as localforage from "localforage";
import { LocalforageService } from '../localforage.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input()
  game: any;
  dbName = "gamesToTrack";
  rowValue: any;
  
  constructor(
    private lf: LocalforageService
  ) { }
  
  async ngOnInit(): Promise<void> {
  }

  async setGameToTrack(gameName: string, isChecked:boolean){
    console.log(`gameCard.setGameToTrack(${gameName}, ${isChecked}) called.`)
    var rowKey = gameName;
    this.rowValue = await this.lf.getRowFromDatabase(this.dbName, rowKey);
    this.rowValue.track = isChecked;
    
    await this.lf.setDatabaseRow("gamesToTrack", rowKey, this.rowValue)
    
    console.log('Database is now:')
    console.log(await this.lf.getAllRecordsFromDatabase("gamesToTrack"))
    
  }
}
