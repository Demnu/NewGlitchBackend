import mongoose from 'mongoose';

const mongoDb = (url: string) => {
  return mongoose.connect(url);
};
export { mongoDb };
