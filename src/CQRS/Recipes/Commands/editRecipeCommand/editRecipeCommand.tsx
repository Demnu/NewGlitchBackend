import { eq, inArray } from 'drizzle-orm';
import { beans } from '../../../../Domain/Entities/beans';
import { db } from '../../../../dbConnection';
import { EditRecipeRequestDto } from './editRecipeDto';
import {
  Recipe_Beans,
  recipe_beans
} from '../../../../Domain/Entities/recipe_beans';

const editRecipeCommand = async (recipeRequest: EditRecipeRequestDto) => {
  // we need to see what beans are not in the db
  // to do this we first get the beans that do exist
  const beansFromDb = await db
    .select()
    .from(beans)
    .where(
      inArray(
        beans.beanName,
        recipeRequest.beans.map((b) => b.beanName)
      )
    );

  // now we filter those beans out
  const newBeansToBeAdded = recipeRequest.beans.filter(
    (b) => !beansFromDb.some((bDb) => bDb.beanName === b.beanName)
  );

  await db.transaction(async (tx) => {
    // first we need to remove the recipe_beans previously associated with the recipe
    await tx
      .delete(recipe_beans)
      .where(eq(recipe_beans.recipeId, recipeRequest.recipeId));

    // now we need to associate the updated beans with the recipe
    // first the beans that were already in the db
    let recipeBeans: Recipe_Beans[] = [];
    beansFromDb.forEach((beanFromDb) => {
      let rb: Recipe_Beans = { amountOrdered: 0, beanId: 0, recipeId: 0 };
      const bean = recipeRequest.beans.find(
        (b) => b.beanName === beanFromDb.beanName
      );
      if (!!bean) {
        rb.amountOrdered = bean?.beanAmount || 0;
        rb.beanId = beanFromDb.id;
        rb.recipeId = recipeRequest.recipeId;
        recipeBeans.push(rb);
      } else {
        throw new Error('Error creating new recipe');
      }
    });
    if (newBeansToBeAdded.length > 0) {
      const newBeans = await tx
        .insert(beans)
        .values(newBeansToBeAdded)
        .returning({ insertedId: beans.id, insertedBeanName: beans.beanName });
      // now add the beans that were just added to the db
      newBeans.forEach((nb) => {
        let rb: Recipe_Beans = {
          amountOrdered: 0,
          beanId: nb.insertedId,
          recipeId: 0
        };
        const bean = recipeRequest.beans.find(
          (b) => b.beanName === nb.insertedBeanName
        );
        if (!!bean) {
          rb.amountOrdered = bean?.beanAmount || 0;
          rb.recipeId = recipeRequest.recipeId;
          recipeBeans.push(rb);
        } else {
          throw new Error('Error creating new recipe');
        }
      });
    }

    // finally add the recipe_beans entries into the database
    await tx.insert(recipe_beans).values(recipeBeans);
  });

  //
};
export { editRecipeCommand };
