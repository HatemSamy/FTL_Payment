import mongoose from 'mongoose';



const paymentVoucherSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    // required: true,
    unique: true,
  },
  amount: { type: Number, required: true },
  payeeOrPayer: { type: String, required: true },
  notes: { type: String },
  // Other fields for payment voucher
});

// Pre-save hook to generate serial number automatically
paymentVoucherSchema.pre('save', async function(next) {
  const lastSerialNumber = await this.constructor.findOne({}, {}, { sort: { 'serialNumber': -1 } });
  let serialNumber = "9010001"; 
  
  if (lastSerialNumber) {
    const lastSerialNumberValue = parseInt(lastSerialNumber.serialNumber.substr(3));
    serialNumber = "901" + ("000" + (lastSerialNumberValue + 1)).slice(-4);
  }

  this.serialNumber = serialNumber;
  next();
});

const PaymentVoucherModel = mongoose.model('PaymentVoucher', paymentVoucherSchema);

export default PaymentVoucherModel;
