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

  async getAllRecordsFromDatabase(dbName: string){
    var db = localforage.createInstance({name: dbName});
    var rows = new Array;
    await db.iterate(function(value, key, iterationNumber) {
      rows.push(value);
    });

    console.log(`${dbName} Length: ${rows.length}`)

    return rows;
  }

  async getRowFromDatabase(dbName: string, rowKey: string){
    var db = await localforage.createInstance({name: dbName});
    var row = await db.getItem(rowKey);
    return row;
  }

  
}
