import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductsClient {
    baseUrl: string;
    auth_token: string;
    constructor(private http: HttpClient) {
        this.baseUrl = `https://shoestore-products-aspnetcore-azure.azurewebsites.net/`;
    }
    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl + "products");
    }
    saveProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.baseUrl + "products",
            product, this.getOptions());
    }
    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.baseUrl}products/${product.id}`,
            product, this.getOptions());
    }
    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${this.baseUrl}products/${id}`,
            this.getOptions());
    }
    private getOptions() {
        return {
            headers: new HttpHeaders({
                "Authorization": `Bearer<${this.auth_token}>`
            })
        }
    }
}