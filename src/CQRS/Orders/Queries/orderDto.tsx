import { Product } from '../../../Domain/Entities/products';

export default interface OrderDto {
  orderId?: string;
  customerName?: string | null;
  products?: Product[];
  dateCreated: string;
}
