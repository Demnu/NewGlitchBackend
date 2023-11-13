import { Recipe } from '../../../../Domain/Entities/recipes';
import { z } from 'zod';

const MakeCalculationRequestDtoSchema = z.object({
  orderIds: z.array(z.string())
});

type MakeCalculationRequestDto = z.infer<
  typeof MakeCalculationRequestDtoSchema
>;

const MakeCalculationRequestDtoJsonSchema: MakeCalculationRequestDto = {
  orderIds: [
    'a0d1b2b9-b532-477f-a9a5-f4158d49f28c',
    '95119cbc-2430-430e-be94-1fbf2906824c'
  ]
};
export {
  MakeCalculationRequestDto,
  MakeCalculationRequestDtoSchema,
  MakeCalculationRequestDtoJsonSchema
};
