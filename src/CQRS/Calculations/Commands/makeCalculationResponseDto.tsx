interface BeanTally {
  id: number;
  beanName: string;
  amountNeededToBeRoasted: number;
}
interface ProductTally {
  id: string;
  productName: string;
  amountOrdered: number;
  hasRecipe: boolean;
}

interface OrdersCalculatedInfo {
  id: string;
  invoiceNumber: string;
  customerName: string;
  createdAt: string;
}

interface MakeCalculationResponseDto {
  ordersCalculatedInformation: OrdersCalculatedInfo[];
  productsTally: ProductTally[];
  beansTally: BeanTally[];
}
const MakeCalculationResponseDtoJsonSchema = {
  $ordersCalculatedInformation: [
    {
      $id: '2b156adb-78fc-43d8-a7c8-24b018f5818f',
      $invoiceNumber: 'AB203',
      $createdAt: '10/12/2023',
      $customerName: 'Autumn Rooms'
    }
  ],
  $productsTally: [
    {
      $id: '1',
      $productName: 'Haywire Blend 1kg',
      $amountOrdered: 100,
      $hasRecipe: true
    },
    {
      $id: '2',
      $productName: 'Sweet Kicks Blend 1kg',
      $amountOrdered: 50,
      $hasRecipe: true
    }
  ],
  $beansTally: [
    { $id: 1, beanName: 'Brazil', amountNeededToBeRoasted: 10000 },
    { $id: 2, beanName: 'Indonesia', amountNeededToBeRoasted: 50000 }
  ]
};
export {
  BeanTally,
  ProductTally,
  OrdersCalculatedInfo,
  MakeCalculationResponseDto,
  MakeCalculationResponseDtoJsonSchema
};
