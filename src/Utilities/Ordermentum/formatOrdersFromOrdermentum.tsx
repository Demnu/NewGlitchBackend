import { Order } from '../../Domain/Entities/orders';
import { Order_Products } from '../../Domain/Entities/orders_products';
import { Product } from '../../Domain/Entities/products';
import { checkIfPossiblyCoffee } from './readAndSaveProducts';

export interface OrderFromOrdermentumType {
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
  invoiceNumber: string;
}

export interface OrderExtended extends Order {
  orderProducts: Order_Products[];
  products: Product[];
}

interface LineItem {
  productId: string;
  name: string;
  price: string;
  quantity: number;
  SKU: 'string';
}

export const readOrders = (
  orders: OrderFromOrdermentumType[],
  supplierId: string | undefined
) => {
  const formattedOrders: OrderExtended[] = [];

  orders.forEach((order) => {
    const tempOrder: OrderExtended = {
      id: order.id,
      customerName: order.retailerAlias,
      supplierName: getSupplierName(supplierId || ''),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      invoiceNumber: order.invoiceNumber,
      orderProducts: [],
      products: [],
      orderStatus: 'notCalculated'
    };
    const orderProducts: Order_Products[] = order.lineItems.map((item) => {
      tempOrder.products.push({
        id: item.productId,
        productName: item.name,
        price: parseFloat(item.price),
        sku: item.SKU,
        possiblyCoffee: checkIfPossiblyCoffee(item.name, item.SKU)
      });
      return {
        orderId: order.id,
        productId: item.productId,
        amountOrdered: item.quantity
      };
    });
    tempOrder.orderProducts = orderProducts;
    formattedOrders.push(tempOrder);
  });
  return formattedOrders;
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
