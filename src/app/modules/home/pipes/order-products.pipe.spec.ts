import { OrderProductsPipe } from './order-products.pipe';

describe('OrderProductsPipe', () => {
  let pipe: OrderProductsPipe;

  beforeEach(() => {
    pipe = new OrderProductsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned value default', () => {
    expect(pipe.transform(null)).toEqual([]);
  });
});
