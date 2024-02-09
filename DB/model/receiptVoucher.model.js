import mongoose from 'mongoose';

const receiptVoucherSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    // required: true,
    unique: true,
  },
  amount: { type: Number, required: true },
  payeeOrPayer: { type: String, required: true },
  notes: { type: String },
});

// Pre-save hook to generate serial number automatically
receiptVoucherSchema.pre('save', async function(next) {
  if (!this.serialNumber) {
    const lastVoucher = await this.constructor.findOne({}, {}, { sort: { 'serialNumber': -1 } });
    let newSerialNumber = "30010001"; // Default starting serial number
    
    if (lastVoucher) {
      const lastSerialNumberValue = parseInt(lastVoucher.serialNumber.substr(4));
      newSerialNumber = "3001" + ("000" + (lastSerialNumberValue + 1)).slice(-4);
    }
    
    this.serialNumber = newSerialNumber;
  }
  
  next();
});

const ReceiptVoucherModel = mongoose.model('ReceiptVoucher', receiptVoucherSchema);

export default ReceiptVoucherModel;
