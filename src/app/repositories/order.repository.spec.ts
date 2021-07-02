import { OrderRepository } from './order.repository';

describe('OrderRepository', () => {
  it('should create an instance', () => {
    expect(new OrderRepository(null)).toBeTruthy();
  });
});
