import createClient from 'ordermentum-sdk';

export const OrdermentumClient = createClient({
  token: process.env.ORDERMENTUM_TOKEN || ''
});
