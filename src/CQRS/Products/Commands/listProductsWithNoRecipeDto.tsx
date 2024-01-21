import { Bean } from '../../../Domain/Entities/beans';
import { Product } from '../../../Domain/Entities/products';
import { Recipe_Beans } from '../../../Domain/Entities/recipe_beans';
import { Recipe } from '../../../Domain/Entities/recipes';

interface ProductDto extends Product {
  recipe: Recipe;
}

const ProductDtoJsonSchema = {
  $id: '1234',
  $possiblyCoffee: true,
  $price: 20,
  $productName: 'Haywire Blend',
  $sku: '1001HWB'
};

export { ProductDto, ProductDtoJsonSchema };
