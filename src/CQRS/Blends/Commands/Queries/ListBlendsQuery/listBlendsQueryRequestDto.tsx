import { Blend } from '../../../../../Domain/Entities/blends';
import { Recipe } from '../../../../../Domain/Entities/recipes';

interface Blends_Extended extends Blend {
  recipes: Recipe[] | null;
  id: number;
}
interface ListBlendsQueryDto {
  blends: Blends_Extended[];
}

const ListBlendsQueryRequestDtoJsonSchema = {
  blends: [
    {
      $blendName: 'Blend',
      $id: 1234,
      $recipes: [
        { $productId: 'abc', $blendId: 1234, $id: 4567, $recipeName: 'Haywire' }
      ]
    }
  ]
};

export {
  ListBlendsQueryDto,
  ListBlendsQueryRequestDtoJsonSchema,
  Blends_Extended
};
