import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ProductRepository } from '../repositories/product.repository';
import { ProductsClient } from '../clients/products.client';

@NgModule({
  declarations: [  
    ProductsListComponent, ProductFormComponent],
  imports: [
    CommonModule, RouterModule, FormsModule],
  exports: [
    ProductsListComponent, ProductFormComponent],
  providers: [ 
    ProductRepository, ProductsClient]
})
export class ProductsModule { }