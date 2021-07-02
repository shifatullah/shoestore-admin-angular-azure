import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { IdentityClient } from './clients/identity.client';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';  
import { ProductFormComponent } from './products/product-form/product-form.component';
import { OrdersListComponent } from './orders/orders-list/orders-list.component';
import { ProductRepository } from './repositories/product.repository';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

const routes: Routes = [  
  { 
      path: "main", component: NavMenuComponent, //canActivate: [AuthGuard],
      children: [
          { path: "products/:mode/:id", component: ProductFormComponent },
          { path: "products/:mode", component: ProductFormComponent },
          { path: "products", component: ProductsListComponent },
          { path: "orders", component: OrdersListComponent },
          { path: "**", redirectTo: "products" }
      ] 
  }  
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes), RouterModule, FormsModule, HttpClientModule, CommonModule,
      ProductsModule, OrdersModule],
  exports: [
    RouterModule, FormsModule],
  providers: [
    AuthService, AuthGuard, IdentityClient, ProductRepository],
  declarations: [
    AuthComponent ],
})
export class AppRoutingModule { }