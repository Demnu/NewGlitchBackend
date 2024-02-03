import { z } from 'zod';

const DeleteBlendRequestDtoSchema = z.object({
  blendId: z.number()
});

type DeleteBlendRequestDto = z.infer<typeof DeleteBlendRequestDtoSchema>;
const DeleteBlendRequestDtoJsonSchema = {
  $blendId: 123
};
export {
  DeleteBlendRequestDtoJsonSchema,
  DeleteBlendRequestDto,
  DeleteBlendRequestDtoSchema
};
