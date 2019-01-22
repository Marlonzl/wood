import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { ShipmentPage } from './shipment/shipment.page';
import { ShipmentDetailPage } from './shipment/shipment-detail/shipment-detail.page';
import { TaxationFormPage } from './taxation-form/taxation-form.page';
import { TaxationFormDetailPage } from './taxation-form/taxation-form-detail/taxation-form-detail.page';


const routes: Routes = [
  { path: '', component: HomePage },


  //出货
  { path: 'shipment-page', component: ShipmentPage },
  { path: 'shipment-detail-page', component: ShipmentDetailPage },

  //报单
  { path: 'taxation-form-page', component: TaxationFormPage },
  { path: 'taxation-form-detail-page', component: TaxationFormDetailPage },





];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }


export const routedComponents = [
  HomePage,

  //出货
  ShipmentPage,
  ShipmentDetailPage,

  //报单
  TaxationFormPage,
  TaxationFormDetailPage

];