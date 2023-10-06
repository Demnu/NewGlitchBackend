import { Product } from '../db/schema/products';

interface data {
  price: string;
  id: string;
  name: string;
  SKU: string;
}

export const readProducts = (products: data[]) => {
  const formattedProducts: Product[] = [];

  products.forEach((product) => {
    const tempProduct: Product = {
      productId: product.id,
      productName: product.name,
      sku: product.SKU,
      price: parseFloat(product.price),
      possiblyCoffee: checkIfPossiblyCoffee(product.name, product.SKU)
    };
    formattedProducts.push(tempProduct);
  });
  return formattedProducts;
};

const checkIfPossiblyCoffee = (name: string, sku: string): boolean => {
  const coffeeKeywords: string[] = [
    'BLEND',
    'Roast',
    'RETAIL',
    'Espresso',
    'Filter',
    'DECAF',
    'Whole Beans',
    'Ground',
    'HuBrew',
    'Coffee',
    'Beans',
    'Bean',
    'Single Origin',
    'BAGS',
    'TINS',
    'CUSTOM',
    'RYO',
    'Premium',
    '250G',
    '1KG',
    '40kg',
    '500G',
    'RRP',
    'TIN'
  ];

  // Combine both strings and convert to uppercase for case-insensitive search
  const bothStrings = (name + sku).toUpperCase();

  for (let keyword of coffeeKeywords) {
    if (bothStrings.includes(keyword.toUpperCase())) {
      return true;
    }
  }

  return false;
};
