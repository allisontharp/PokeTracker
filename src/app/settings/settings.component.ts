import { Component, OnInit } from '@angular/core';
import { LocalforageService } from '../localforage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private lf: LocalforageService
  ) { }

  ngOnInit(): void {
  }

  async deleteDatabase(databaseName){
    await this.lf.deleteDatabase(databaseName);
  }
}
