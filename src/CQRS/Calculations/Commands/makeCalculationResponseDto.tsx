interface BeanTally {
  beanId: number;
  beanName: string;
  amountNeededToBeRoasted: number;
}
interface ProductTally {
  productId: string;
  productName: string;
  amountOrdered: number;
  hasRecipe: boolean;
}

interface OrdersCalculatedInfo {
  orderId: string;
  customerName: string;
  createdAt: string;
}

interface MakeCalculationResponseDto {
  ordersCalculatedInformation: OrdersCalculatedInfo[];
  productsTally: ProductTally[];
  beansTally: BeanTally[];
}
const MakeCalculationResponseDtoJsonSchema: MakeCalculationResponseDto = {
  ordersCalculatedInformation: [
    {
      orderId: '2b156adb-78fc-43d8-a7c8-24b018f5818f',
      createdAt: '10/12/2023',
      customerName: 'Autumn Rooms'
    }
  ],
  productsTally: [
    {
      productId: '1',
      productName: 'Haywire Blend 1kg',
      amountOrdered: 100,
      hasRecipe: true
    },
    {
      productId: '2',
      productName: 'Sweet Kicks Blend 1kg',
      amountOrdered: 50,
      hasRecipe: true
    }
  ],
  beansTally: [
    { beanId: 1, beanName: 'Brazil', amountNeededToBeRoasted: 10000 },
    { beanId: 2, beanName: 'Indonesia', amountNeededToBeRoasted: 50000 }
  ]
};
export {
  BeanTally,
  ProductTally,
  OrdersCalculatedInfo,
  MakeCalculationResponseDto,
  MakeCalculationResponseDtoJsonSchema
};
