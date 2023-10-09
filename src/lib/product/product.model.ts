import mongoose, { Schema, models } from 'mongoose';

export const ProductSchema = new Schema({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  total_invest_price: {
    type: Number,
  },
  date: {
    type: String,
  },
  information: {
    type: String,
  },
  invest_price: {
    type: Number,
  },
  isInvesting: {
    type: Boolean,
  },
});

const Product = models?.product || mongoose.model('product', ProductSchema);

export default Product;
