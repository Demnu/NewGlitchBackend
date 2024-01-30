import { CreateRecipeRequestDto } from '../CQRS/Recipes/Commands/createRecipeRequestDto';
import { Bean, beans } from '../Domain/Entities/beans';
import { Product, products } from '../Domain/Entities/products';
import { Recipe_Beans, recipe_beans } from '../Domain/Entities/recipe_beans';
import { Recipe, recipes } from '../Domain/Entities/recipes';
import { createLog } from '../Utilities/Logs/makeLog';
import { OrderExtended } from '../Utilities/Ordermentum/formatOrdersFromOrdermentum';
import { db } from '../dbConnection';
import { OrderMongo } from './MongoModels/ordersMongoSchema';
import { ProductMongo } from './MongoModels/productMongoSchema';
import { RecipeMongo } from './MongoModels/recipesMongoSchema';
import { mongoDb } from './mongoConnection';
import 'dotenv/config';

interface BeanMap {
  beanName: string;
  beanAmount: number;
  beanId?: number;
}

interface RecipesMap {
  recipeId?: number;
  blendName?: string;
  productName?: string;
  productId?: string;
  beans: BeanMap[];
}

const getRecipesFromMongo = async () => {
  const mongDb = await mongoDb(process.env.MONGO_URI || '');
  const productsMap: Map<string, string> = new Map();
  const beansToAdd: Map<string, Bean> = new Map();
  const recipesToAdd: Map<string, RecipesMap> = new Map();

  const allRecipes = await RecipeMongo.find().lean();

  // make products map
  const productsFromDb = await db.query.products.findMany();
  productsFromDb.forEach((product) => {
    productsMap.set(product.productName, product.id);
  });

  // Array to hold bean names for checking duplicates before pushing to beansToAdd

  for (const recipe of allRecipes) {
    // Your existing logic here
    // This loop will correctly wait for any `await` calls inside it.
    const tempBeansMap: BeanMap[] = [];
    if (!!recipe.bean1Name) {
      beansToAdd.set(recipe.bean1Name, { beanName: recipe.bean1Name });
      if (!!recipe.bean1Amount) {
        tempBeansMap.push({
          beanName: recipe.bean1Name,
          beanAmount: Number.parseInt(recipe.bean1Amount)
        });
      }
    }

    if (!!recipe.bean2Name) {
      beansToAdd.set(recipe.bean2Name, { beanName: recipe.bean2Name });
      if (!!recipe.bean2Amount) {
        tempBeansMap.push({
          beanName: recipe.bean2Name,
          beanAmount: Number.parseInt(recipe.bean2Amount)
        });
      }
    }

    if (!!recipe.bean3Name) {
      beansToAdd.set(recipe.bean3Name, { beanName: recipe.bean3Name });
      if (!!recipe.bean3Amount) {
        tempBeansMap.push({
          beanName: recipe.bean3Name,
          beanAmount: Number.parseInt(recipe.bean3Amount)
        });
      }
    }

    if (!!recipe.bean4Name) {
      beansToAdd.set(recipe.bean4Name, { beanName: recipe.bean4Name });
      if (!!recipe.bean4Amount) {
        tempBeansMap.push({
          beanName: recipe.bean4Name,
          beanAmount: Number.parseInt(recipe.bean4Amount)
        });
      }
    }

    if (!!recipe.bean5Name) {
      beansToAdd.set(recipe.bean5Name, { beanName: recipe.bean5Name });
      if (!!recipe.bean5Amount) {
        tempBeansMap.push({
          beanName: recipe.bean5Name,
          beanAmount: Number.parseInt(recipe.bean5Amount)
        });
      }
    }

    if (!!recipe.bean6Name) {
      beansToAdd.set(recipe.bean6Name, { beanName: recipe.bean6Name });
      if (!!recipe.bean6Amount) {
        tempBeansMap.push({
          beanName: recipe.bean6Name,
          beanAmount: Number.parseInt(recipe.bean6Amount)
        });
      }
    }

    if (!!recipe.bean7Name) {
      beansToAdd.set(recipe.bean7Name, { beanName: recipe.bean7Name });
      if (!!recipe.bean7Amount) {
        tempBeansMap.push({
          beanName: recipe.bean7Name,
          beanAmount: Number.parseInt(recipe.bean7Amount)
        });
      }
    }

    if (!!recipe.bean8Name) {
      beansToAdd.set(recipe.bean8Name, { beanName: recipe.bean8Name });
      if (!!recipe.bean8Amount) {
        tempBeansMap.push({
          beanName: recipe.bean8Name,
          beanAmount: Number.parseInt(recipe.bean8Amount)
        });
      }
    }
    if (!!recipe.product) {
      const productId = productsMap.get(recipe.product);
      if (!productId) {
        const productToBeAdded: Product = {
          id: recipe.product,
          productName: recipe.product,
          price: -1,
          sku: 'N/A',
          possiblyCoffee: true
        };
        try {
          const addedProduct = await db
            .insert(products)
            .values(productToBeAdded)
            .returning({ productId: products.id });
          recipesToAdd.set(recipe.product, {
            blendName: recipe.blendName ? recipe.blendName : undefined,
            productName: recipe.product,
            beans: tempBeansMap,
            productId: addedProduct[0].productId
          });
        } catch (error) {
          createLog(
            'error',
            `Error saving product: ${recipe.product} for a new recipe, ${error}`,
            __filename
          );
          throw error;
        }
      } else {
        recipesToAdd.set(recipe.product, {
          blendName: recipe.blendName ? recipe.blendName : undefined,
          productName: recipe.product,
          beans: tempBeansMap,
          productId: productsMap.get(recipe.product)
        });
      }
    }
  }
  // delete all beans, delete all recipe_beans and delete recipes
  await db.transaction(async (tx) => {
    await tx.delete(recipe_beans);
    await tx.delete(recipes);
    await tx.delete(beans);

    const allBeansFromMap = Array.from(beansToAdd.values());
    // add new beans
    const addedBeans = await tx
      .insert(beans)
      .values(allBeansFromMap)
      .returning({ beanId: beans.id, beanName: beans.beanName });

    // add beanIds to recipes
    recipesToAdd.forEach((recipe) => {
      recipe.beans.forEach((bean) => {
        const foundBean = addedBeans.find(
          (ab) => ab.beanName === bean.beanName
        );
        if (!foundBean) {
          createLog(
            'error',
            'Error saving recipes from mongo to db, A bean was not saved to the database',
            __filename
          );
          tx.rollback();

          throw Error(
            'Error saving recipes from mongo to db,A bean was not saved to the database '
          );
        } else {
          bean.beanId = foundBean.beanId;
        }
      });
    });

    // add recipes
    let recipesToBeAddedFormatted: Recipe[] = [];
    recipesToAdd.forEach((r) => {
      if (!!r.productId && !!r.productName && r.beans.length > 0) {
        const tempRecipe: Recipe = {
          // ble: r.blendName,
          productId: r.productId,
          recipeName: r.productName
        };
        recipesToBeAddedFormatted.push(tempRecipe);
      } else {
        createLog(
          'error',
          'Error saving recipes from mongo to db, Something went wrong, 1',
          __filename
        );
        throw Error(
          'Error saving recipes from mongo to db,A bean was not saved to the database, 1 '
        );
        tx.rollback();
      }
    });
    const recipeResults = await tx
      .insert(recipes)
      .values(recipesToBeAddedFormatted)
      .returning({ recipeId: recipes.id, recipeName: recipes.recipeName });

    let allRecipeBeans: Recipe_Beans[] = [];
    // add recipe ids to recipeMap
    recipeResults.forEach((rr) => {
      const tempRecipe = recipesToAdd.get(rr.recipeName);
      if (!!tempRecipe) {
        const recipeBeansValues: Recipe_Beans[] = tempRecipe.beans.map((b) => {
          if (!!b.beanId && !!rr.recipeId) {
            const tempRecipeBean: Recipe_Beans = {
              beanId: b.beanId,
              amountOrdered: b.beanAmount,
              recipeId: rr.recipeId
            };
            return tempRecipeBean;
          } else {
            createLog(
              'error',
              'Error saving recipes from mongo to db, Something went wrong, 2',
              __filename
            );
            tx.rollback();

            throw Error(
              'Error saving recipes from mongo to db,A bean was not saved to the database,2'
            );
          }
        });
        allRecipeBeans = [...allRecipeBeans, ...recipeBeansValues];
      }
    });
    try {
      await tx.insert(recipe_beans).values(allRecipeBeans);
    } catch (error) {
      createLog(
        'error',
        `Error saving recipes from mongo to db, Something went wrong,${error}`,
        __filename
      );
      tx.rollback();
      throw Error(
        `Error saving recipes from mongo to db, Something went wrong,${error}`
      );
    }
  });
  createLog(
    'informational',
    `Succesfully added ${allRecipes.length} recipes from mongoDb`,
    __filename
  );
};

export { getRecipesFromMongo };
