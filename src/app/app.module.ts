import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { RegionPageComponent } from './region-page/region-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    RegionPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
