import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionPageComponent} from './region-page/region-page.component';


const routes: Routes = [
  { path: 'Region/:id',      component: RegionPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
