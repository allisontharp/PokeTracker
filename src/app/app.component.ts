import { Component } from '@angular/core';
import { LocalforageService } from './localforage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  constructor(
    private lf: LocalforageService
  ) { }

  gamesToTrack;
  title = 'PokeTracker';
  async ngOnInit(): Promise<void> {
    this.gamesToTrack = await this.lf.getAllRecordsFromDatabase("gamesToTrack");
    this.gamesToTrack = this.gamesToTrack.filter(g => g.track == true);
  }
}
