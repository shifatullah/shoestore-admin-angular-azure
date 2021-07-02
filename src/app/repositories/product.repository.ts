import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { ProductsClient } from "../clients/products.client";

@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];

    constructor(private client: ProductsClient) {
        client.getProducts().subscribe(data => {
            this.products = data;
            this.categories = data.map(p => p.category)
                .filter((c, index, array) => array.indexOf(c) == index).sort();
        });
    }

    getProducts(category: string = null): Product[] {
        return this.products
            .filter(p => category == null || category == p.category);
    }
    getProduct(id: number): Product {
        return this.products.find(p => p.id == id);
    }
    
    getCategories(): string[] {
        return this.categories;
    }

    saveProduct(product: Product) {
        if (product.id == null || product.id == 0) {
            this.client.saveProduct(product)
                .subscribe(p => this.products.push(p));
        } else {
            this.client.updateProduct(product)
                .subscribe(p => {
                    this.products.splice(this.products.
                        findIndex(p => p.id == product.id), 1, product);
                });
        }
    }
    deleteProduct(id: number) {
        this.client.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.
                findIndex(p => p.id == id), 1);
        })
    }
}