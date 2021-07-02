import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { FormsModule } from '@angular/forms';
import { OrderRepository } from '../repositories/order.repository';
import { OrdersClient } from '../clients/orders.client';

@NgModule({
  declarations: [      
    OrdersListComponent
  ],
  imports: [
    CommonModule, FormsModule
  ],
  providers: [
    OrderRepository, OrdersClient
  ]
})
export class OrdersModule { }
