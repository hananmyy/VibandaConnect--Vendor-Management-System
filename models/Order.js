const mongoose = require("mongoose")
const Schema = mongoose.Schema


const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'Rider' },
  items: [{ name: String, quantity: Number }],
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', orderSchema);
