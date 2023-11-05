import { Product } from '../../../Domain/Entities/products';

interface ProductExtended extends Product {
  amountOrdered: number;
}

interface OrderDto {
  orderId?: string;
  customerName?: string | null;
  products?: ProductExtended[];
  dateCreated: string;
}

const OrderDtoJsonSchema = {
  $orderId: '123',
  $dateCreated: '08/09/1998',
  $customerName: 'Harry',
  $products: [
    {
      $productName: 'Haywire Blend',
      $id: '12345',
      $possiblyCoffee: true,
      $price: 123,
      $sku: 'HW_B',
      $amountOrdered: 20
    }
  ]
};

const ProductExtendedJsonSchema = {
  $productName: 'Haywire Blend',
  $id: '12345',
  $possiblyCoffee: true,
  $price: 123,
  $sku: 'HW_B',
  $amountOrdered: 20
};

export {
  OrderDto,
  ProductExtended,
  OrderDtoJsonSchema,
  ProductExtendedJsonSchema
};
