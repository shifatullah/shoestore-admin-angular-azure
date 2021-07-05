import { Component, OnInit } from '@angular/core';
import { Product } from "../../models/product.model";
import { ProductRepository } from "../../repositories/product.repository";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.sass']
})
export class ProductsListComponent implements OnInit {
  constructor(private repository: ProductRepository) { }
  ngOnInit(): void {
  }
  getProducts(): Product[] {    
    return this.repository.getProducts();
  }
  deleteProduct(id: number) {
      this.repository.deleteProduct(id);
  }
}