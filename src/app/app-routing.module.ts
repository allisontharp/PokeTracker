import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamePageComponent} from './game-page/game-page.component';
import {OverviewPageComponent} from './overview-page/overview-page.component'
import { SettingsComponent } from './settings/settings.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  { path: 'Game/:id',      component: GamePageComponent },
  { path: '',      component: OverviewPageComponent },
  { path: 'Settings',      component: SettingsComponent },
  { path: 'Game/:id/:numberNational', component: PokemonDetailsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
