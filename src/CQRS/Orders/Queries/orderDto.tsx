import { Product } from '../../../Domain/Entities/products';

interface ProductExtended extends Product {
  amountOrdered: number;
  hasRecipe: boolean;
}

interface OrderDto {
  id?: string;
  customerName?: string | null;
  products?: ProductExtended[];
  dateCreated: string;
}

const OrderDtoJsonSchema = {
  $id: '123',
  $dateCreated: '08/09/1998',
  $customerName: 'Harry',
  $products: [
    {
      $productName: 'Haywire Blend',
      $id: '12345',
      $possiblyCoffee: true,
      $price: 123,
      $sku: 'HW_B',
      $amountOrdered: 20,
      $hasRecipe: true
    }
  ]
};

const ProductExtendedJsonSchema = {
  $productName: 'Haywire Blend',
  $id: '12345',
  $possiblyCoffee: true,
  $price: 123,
  $sku: 'HW_B',
  $amountOrdered: 20,
  $hasRecipe: true
};

export {
  OrderDto,
  ProductExtended,
  OrderDtoJsonSchema,
  ProductExtendedJsonSchema
};
