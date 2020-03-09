import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// import { ServiceWorkerModule } from '@angular/service-worker';

import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { RegionPageComponent } from './region-page/region-page.component';
import { FilterPipe } from './filter.pipe';
import { FavoriteiconComponent } from './favoriteicon/favoriteicon.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    RegionPageComponent,
    FilterPipe,
    FavoriteiconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
