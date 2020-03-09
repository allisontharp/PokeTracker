import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegionPageComponent} from './region-page/region-page.component';
import {OverviewPageComponent} from './overview-page/overview-page.component'

const routes: Routes = [
  { path: 'Region/:id',      component: RegionPageComponent },
  { path: '',      component: OverviewPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
