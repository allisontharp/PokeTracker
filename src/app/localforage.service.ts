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

  public async deleteDatabase(databaseName){
    console.log(`deleteDatabase(${databaseName}) called.`)
    var db = await localforage.createInstance({name: databaseName});
    db.clear();
  }

  
}
