import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  }
});

const ProductMongo = mongoose.model('Product', ProductSchema);

export { ProductMongo };
