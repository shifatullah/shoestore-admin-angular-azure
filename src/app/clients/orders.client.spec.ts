import { OrdersClient } from './orders.client';

describe('OrdersClient', () => {
  it('should create an instance', () => {
    expect(new OrdersClient(null)).toBeTruthy();
  });
});
