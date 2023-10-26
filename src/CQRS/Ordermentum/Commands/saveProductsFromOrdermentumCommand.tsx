import { Request, Response, Router } from 'express';
import ordermentumClient from '../../../ordermentumConnection';
import { Product } from '../../../Domain/Entities/products';
import db from '../../../dbConnection';
import { products } from '../../../Domain/Entities/products';
import { eq, inArray } from 'drizzle-orm';

const saveProductsFromOrdermentumCommand = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getProductsFromOrdermentum();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to get products from Ordermentum');
  }
};

export async function getProductsFromOrdermentum(): Promise<string> {
  // Set your custom pagination settings
  const customPagination = { pageSize: 500, pageNo: 1 };

  // Fetch products for each supplier with the custom pagination settings
  const distResults = await ordermentumClient.products.findAll({
    ...customPagination,
    supplierId: process.env.DIST_SUPPLIER_ID
  });
  const flamResults = await ordermentumClient.products.findAll({
    ...customPagination,
    supplierId: process.env.FLAM_SUPPLIER_ID
  });
  const glitchResults = await ordermentumClient.products.findAll({
    ...customPagination,
    supplierId: process.env.GLITCH_SUPPLIER_ID
  });

  let formattedProducts = readProducts(distResults.data);
  formattedProducts = [...formattedProducts, ...readProducts(flamResults.data)];
  formattedProducts = [
    ...formattedProducts,
    ...readProducts(glitchResults.data)
  ];

  // update saved orders
  const productIds = formattedProducts.map(
    (formattedProduct) => formattedProduct.id
  );

  const results = await db
    .select()
    .from(products)
    .where(inArray(products.id, productIds));

  const promises = results.map((product) => {
    var updatedProduct = formattedProducts.find((p) => p.id == product.id);
    if (updatedProduct) {
      return db
        .update(products)
        .set({
          productName: updatedProduct.productName,
          sku: updatedProduct.sku,
          price: updatedProduct.price,
          possiblyCoffee: updatedProduct.possiblyCoffee
        })
        .where(eq(products.id, product.id));
    }
  });
  await Promise.all(promises);

  // save unstored orders
  await db.insert(products).values(formattedProducts).onConflictDoNothing();
  return 'Products saved!';
}

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
      id: product.id,
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

export default saveProductsFromOrdermentumCommand;
