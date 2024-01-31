import { blends } from '../../../../../Domain/Entities/blends';
import { Recipe } from '../../../../../Domain/Entities/recipes';
import { db } from '../../../../../dbConnection';
import {
  Blends_Extended,
  ListBlendsQueryDto
} from './listBlendsQueryRequestDto';

const listBlendsQuery = async (): Promise<ListBlendsQueryDto> => {
  const result = await db.query.blends.findMany({
    with: { recipes: true }
  });
  // convert result into the dto
  const tempBlends: Blends_Extended[] = result.map((b) => {
    let tempBlend: Blends_Extended = {
      id: b.id,
      blendName: b.blendName,
      recipes: b.recipes
    };
    return tempBlend;
  });

  const blendsList: ListBlendsQueryDto = { blends: tempBlends };
  return blendsList;
};

export { listBlendsQuery };
