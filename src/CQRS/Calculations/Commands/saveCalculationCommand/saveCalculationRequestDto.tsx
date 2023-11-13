import { z } from 'zod';

// Define Zod schemas for each interface
const BeanTallySchema = z.object({
  id: z.number(),
  beanName: z.string(),
  amountNeededToBeRoasted: z.number()
});
const ProductTallySchema = z.object({
  id: z.string(),
  productName: z.string(),
  amountOrdered: z.number(),
  hasRecipe: z.boolean()
});
const OrdersCalculatedInfoSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  customerName: z.string(),
  createdAt: z.string() // Assuming createdAt is a string, modify if it's a Date
});

// Combine them into a single schema
const SaveCalculationRequestDtoSchema = z.object({
  author: z.string(),
  createdAt: z.coerce.date(),
  calculationName: z.string(),
  ordersCalculatedInformation: z.array(OrdersCalculatedInfoSchema),
  productsTally: z.array(ProductTallySchema),
  beansTally: z.array(BeanTallySchema)
});

// Derive TypeScript types
type BeanTally = z.infer<typeof BeanTallySchema>;
type ProductTally = z.infer<typeof ProductTallySchema>;
type OrdersCalculatedInfo = z.infer<typeof OrdersCalculatedInfoSchema>;
type SaveCalculationRequestDto = z.infer<
  typeof SaveCalculationRequestDtoSchema
>;

const SaveCalculationRequestDtoJsonSchema = {
  $author: 'Harry',
  $createdAt: new Date().toISOString(),
  $calculationName: 'Calculation 2/8 - 9/8',

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
  SaveCalculationRequestDto,
  SaveCalculationRequestDtoJsonSchema,
  SaveCalculationRequestDtoSchema
};
