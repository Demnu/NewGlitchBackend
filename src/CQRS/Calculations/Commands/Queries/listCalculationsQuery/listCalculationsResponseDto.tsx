import {
  BeanTally,
  OrdersCalculatedInfo,
  ProductTally
} from '../../saveCalculationCommand/saveCalculationRequestDto';

interface ListCalculationsResponseDto {
  id: number;
  beansTally: BeanTally;
  productsTally: ProductTally;
  ordersCalculatedInformation: OrdersCalculatedInfo;
  author: string;
  createdAt: string;
  calculationName: string;
}

const ListCalculationsResponseDtoJsonSchema = {
  $id: 12345,
  $author: 'Harry',
  $calculationName: 'Calculation 2/8 - 9/8',
  $createdAt: new Date().toISOString(),
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
export { ListCalculationsResponseDto, ListCalculationsResponseDtoJsonSchema };
