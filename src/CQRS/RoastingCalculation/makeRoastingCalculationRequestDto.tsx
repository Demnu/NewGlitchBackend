import { z } from 'zod';

const MakeRoastingCalculationRequestDtoSchema = z.object({
  calculationId: z.number()
});

type MakeRoastingCalculationRequestDto = z.infer<
  typeof MakeRoastingCalculationRequestDtoSchema
>;

const MakeRoastingCalculationRequestDtoJsonSchema = {
  $calculationId: 1234
};
export {
  MakeRoastingCalculationRequestDtoSchema,
  MakeRoastingCalculationRequestDto,
  MakeRoastingCalculationRequestDtoJsonSchema
};
