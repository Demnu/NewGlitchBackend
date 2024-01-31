import { blends } from '../../../../../Domain/Entities/blends';
import { Recipe } from '../../../../../Domain/Entities/recipes';
import { db } from '../../../../../dbConnection';
import { ListBlendsQueryDto } from './listBlendsQueryRequestDto';

const listBlendsQuery = async () => {
  const result = await db.query.blends.findMany({
    with: { recipes: true }
  });
  // convert result into the dto
  const tempBlends: ListBlendsQueryDto[] = result.map((b) => {
    let tempBlend: ListBlendsQueryDto = {
      id: b.id,
      blendName: b.blendName,
      recipes: b.recipes
    };
    return tempBlend;
  });

  return tempBlends;
};

export { listBlendsQuery };
