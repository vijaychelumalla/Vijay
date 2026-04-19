const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  deliveryInfo: {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true }
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      img: { type: String }
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0.0
  },
  paymentMethod: {
    type: String,
    required: true,
    default: 'Cash on Delivery'
  },
  orderStatus: {
    type: String,
    required: true,
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
