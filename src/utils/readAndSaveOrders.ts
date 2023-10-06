import { Order } from '../db/schema/orders';
import { Order_Products } from '../db/schema/orders_products';
import { Product } from '../db/schema/products';
interface ProductsAndOrders {
  formattedOrders: Order[];
  orderProductsFormatted: Order_Products[];
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
  productId: string;
  name: string;
  price: string;
  quantity: number;
}
export const readOrders = (orders: data[], supplierId: string | undefined) => {
  const t = 0;
  const data: ProductsAndOrders = {
    formattedOrders: [],
    orderProductsFormatted: []
  };
  orders.forEach((order) => {
    const tempOrder: Order = {
      id: order.id,
      customerName: order.retailerAlias,
      supplierName: getSupplierName(supplierId || ''),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    };
    order.lineItems.forEach((item) => {
      data.orderProductsFormatted.push({
        orderId: order.id,
        productId: item.productId,
        amountOrdered: item.quantity,
      });
    });
    data.formattedOrders.push(tempOrder);
  });
  return data;
};

const getSupplierName = (supplierId: string) => {
  switch (supplierId) {
    case process.env.DIST_SUPPLIER_ID:
      return 'Distribution';
    case process.env.GLITCH_SUPPLIER_ID:
      return 'Glitch';
    case process.env.FLAM_SUPPLIER_ID:
      return 'Flamingo';
    default:
      return 'N/A';
  }
};
