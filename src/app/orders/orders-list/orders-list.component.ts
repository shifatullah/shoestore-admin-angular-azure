import { Component, OnInit } from '@angular/core';
import { Order } from "../../models/order.model";
import { OrderRepository } from "../../repositories/order.repository";

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.sass']
})
export class OrdersListComponent implements OnInit {
  includeShipped = false;
    constructor(private repository: OrderRepository) {}    
    ngOnInit(): void {
    }
    getOrders(): Order[] {
      let orders: Order[] = [];
      return orders;
      // return this.repository.getOrders()
      //     .filter(o => this.includeShipped || !o.shipped);
    }
    markShipped(order: Order) {
        order.shipped = true;
        this.repository.updateOrder(order);
    }
    delete(id: number) {
        this.repository.deleteOrder(id);
    }
}
