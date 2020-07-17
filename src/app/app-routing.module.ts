import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './products/product/product.component';
import { OrderEditComponent } from './edit/order-edit.component';
import { AddressComponent } from './address/address.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path:'product',
    component:ProductComponent
  },
  {
    path:'edit',
    component:OrderEditComponent
  },
  {
    path:'address',
    component:AddressComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
