import createClient from 'ordermentum-sdk';

const ordermentumClient = createClient({
  token: process.env.ORDERMENTUM_TOKEN || ''
});

export default ordermentumClient;
