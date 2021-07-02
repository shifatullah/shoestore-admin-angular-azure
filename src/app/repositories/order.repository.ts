import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../models/order.model";
import { OrdersClient } from "../clients/orders.client";

@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;
    
    constructor(private client: OrdersClient) { }
    
    loadOrders() {
        this.loaded = true;
        this.client.getOrders()
            .subscribe(orders => this.orders = orders);
    }

    getOrders(): Order[] {
        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }
    saveOrder(order: Order): Observable<Order> {
        return this.client.saveOrder(order);
    }

    updateOrder(order: Order) {
        this.client.updateOrder(order).subscribe(order => {
            this.orders.splice(this.orders.
                findIndex(o => o.id == order.id), 1, order);
        });
    }
    deleteOrder(id: number) {
        this.client.deleteOrder(id).subscribe(order => {
            this.orders.splice(this.orders.findIndex(o => id == o.id), 1);
        });
    }
}