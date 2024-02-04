import { z } from 'zod';

const RoastingCalculation = z.object({
  blendId: z.number(),
  amount: z.number(),
  blendName: z.string()
});

const MakeRoastingCalculationResponseDtoSchema = z.object({
  roastingCalculation: z.array(RoastingCalculation)
});

type MakeRoastingCalculationResponseDto = z.infer<
  typeof MakeRoastingCalculationResponseDtoSchema
>;

const MakeRoastingCalculationResponseDtoJsonSchema = {
  $roastingCalculation: [
    { $blendId: 123, $amount: 1200, $blendName: 'Haywire' }
  ]
};
export {
  MakeRoastingCalculationResponseDtoSchema,
  MakeRoastingCalculationResponseDto,
  MakeRoastingCalculationResponseDtoJsonSchema
};
