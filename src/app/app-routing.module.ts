import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostCalculationComponent } from './cost-calculation/cost-calculation-contact.component';

const routes: Routes = [

  {
    path: 'carauction/calculator',
    component: CostCalculationComponent,
    title: 'Car Auction'
  },
  { path: '', redirectTo: 'carauction/calculator', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
