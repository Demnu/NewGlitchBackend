import { Blend } from '../../../../../Domain/Entities/blends';
import { Recipe } from '../../../../../Domain/Entities/recipes';

interface ListBlendsQueryDto extends Blend {
  recipes: Recipe[] | null;
  id: number;
}
[];

const ListBlendsQueryRequestDtoJsonSchema = {
  $blendName: 'Haywire',
  $id: 1234,
  $recipes: [
    {
      $productId: 'asdasd',
      $blendId: 1234,
      $recipeName: 'Haywire 1KG'
    }
  ]
};

export { ListBlendsQueryDto, ListBlendsQueryRequestDtoJsonSchema };
