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
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { SettingsComponent } from './settings/settings.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SortPipe } from './sort.pipe';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonCardComponent,
    RegionPageComponent,
    FilterPipe,
    FavoriteiconComponent,
    OverviewPageComponent,
    SettingsComponent,
    SortPipe,
    PokemonDetailsComponent,
    ScrollToTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
