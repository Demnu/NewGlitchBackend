import { z } from 'zod';

const ListOrdersRequestDtoSchema = z.object({
  dateTo: z.coerce.date().optional(),
  dateFrom: z.coerce.date().optional()
});

type ListOrdersRequestDto = z.infer<typeof ListOrdersRequestDtoSchema>;
const ListOrdersRequestDtoJsonSchema = {
  $dateTo: new Date().toISOString(),
  $dateFrom: new Date().toISOString()
};
export {
  ListOrdersRequestDto,
  ListOrdersRequestDtoSchema,
  ListOrdersRequestDtoJsonSchema
};
