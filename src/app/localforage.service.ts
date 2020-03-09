import { Injectable } from '@angular/core';
import * as localforage from "localforage";

@Injectable({
  providedIn: 'root'
})
export class LocalforageService {

  constructor() { }

  public async setDatabaseRow(databaseName: string, rowKey: string, rowValue: any){
    var db = localforage.createInstance({name: databaseName});
    await db.setItem(rowKey, rowValue).then(function (value) {
    }).catch(function(err) {
      console.error(`setDatabaseRow Error: ${err}`);
    });
  }

  
}
