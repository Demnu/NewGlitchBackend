import { Order } from '../db/schema/orders';
import { Order_Products } from '../db/schema/orders_products';
import { Product } from '../db/schema/products';
interface ProductsAndOrders {
  formattedOrders: Order[];
  products: Product[];
  order_products: Order_Products[];
}

interface data {
  id: string;
  createdAt: string;
  createdBy: string;
  dueAt: string;
  orderNumber: string;
  retailerAlias: string;
  status: string;
  subtotal: number;
  totalCharge: number;
  lineItems: LineItem[];
  updatedAt: string;
}

interface LineItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}
export const readOrders = (orders: data[], supplierId: string | undefined) => {
  const t = 0;
  const data: ProductsAndOrders = {
    formattedOrders: [],
    products: [],
    order_products: []
  };
  const formattedOrders: Order[] = [];

  orders.forEach((order) => {
    const tempOrder: Order = {
      orderId: order.id,
      customerName: order.retailerAlias,
      supplierName: getSupplierName(supplierId || ''),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };
    order.lineItems.forEach((item) => {});
    formattedOrders.push(tempOrder);
  });
  data.formattedOrders = formattedOrders;
  return data;
};

const getSupplierName = (supplierId: string) => {
  switch (supplierId) {
    case process.env.DIST_SUPPLIER_ID:
      return 'Distribution';
    case process.env.GLITCH_SUPPLIER_ID:
      return 'Glitch';
    case process.env.DIST_SUPPLIER_ID:
      return 'Flamingo';
    default:
      return 'N/A';
  }
};
