import { readFileSync } from 'fs';

interface Bean {
  beanName: string;
  amount: number;
  beanId?: number;
}

interface Recipe {
  recipeName: string;
  beans: Bean[];
  productId?: string;
  recipeId?: number;
}

export class RecipeTransformer {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  transform(): Recipe[] {
    const content = readFileSync(this.filePath, 'utf-8');
    const lines = content.trim().split('\n');
    return lines.map((line) => this.transformToDesiredFormat(JSON.parse(line)));
  }

  private transformToDesiredFormat(data: any): Recipe {
    let beans: Bean[] = [];

    for (let i = 1; i <= 8; i++) {
      if (data[`bean${i}Name`] && data[`bean${i}Amount`]) {
        beans.push({
          beanName: data[`bean${i}Name`],
          amount: parseFloat(data[`bean${i}Amount`])
        });
      }
    }

    return {
      recipeName: data.product,
      beans: beans
    };
  }
}
