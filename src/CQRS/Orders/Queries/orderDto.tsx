import { Product } from '../../../Domain/Entities/products';

export default interface OrderDto {
  orderId?: string;
  customerName?: string | null;
  products?: Product[];
  dateCreated: string;
}

export const OrderDtoJsonSchema: OrderDto = {
  orderId: '123',
  dateCreated: '08/09/1998',
  customerName: 'Harry',
  products: [
    {
      productName: 'Haywire Blend',
      id: '12345',
      possiblyCoffee: true,
      price: 123,
      sku: 'HW_B'
    }
  ]
};
