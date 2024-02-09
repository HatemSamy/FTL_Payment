import PaymentVoucherModel from '../../../../DB/model/VoucherPayment.model.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { asynchandlier } from '../../../services/erroeHandling.js';


    export const create = asynchandlier(async (req, res) => {
        
          const voucher = await PaymentVoucherModel.create(req.body);
          
          // Generate PDF
          const doc = new PDFDocument();
          const pdfPath = `pdf/payment_voucher_${voucher._id}.pdf`;
          doc.pipe(fs.createWriteStream(pdfPath));
    
          doc.fontSize(20).text('Payment Voucher Details', { align: 'center' });
          doc.fontSize(14).text(`Serial Number: ${voucher.serialNumber}`);
          doc.end();
    
          res.status(201).json({message:"Pdf created successfully",voucher});
        
      })

      export const getById = asynchandlier(async (req, res) => {
   
      const voucher = await PaymentVoucherModel.findById(req.params.id);

      if (!voucher) {
        return next (new Error("the voucherpayment not found"))
      }
      res.status(2001).json({data:voucher});
   
      })

      export const update = asynchandlier(async(req, res)=> {
    
    const voucherFound = await  PaymentVoucherModel.findById(req.params.id)
    if (!voucherFound) {
        return next (new Error("the voucherpayment not found"))
      }
      const voucher = await PaymentVoucherModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(2001).json({message:"voucherpayment Updated Successfully" ,data:voucher});
      
   
  })

  export const deletePayment = asynchandlier(async(req, res) => {
    const voucherFound = await  PaymentVoucherModel.findById(req.params.id)
    if (!voucherFound) {
        return next (new Error("the voucherpayment not found"))
      }
      await PaymentVoucherModel.findByIdAndDelete(req.params.id);
      res.status(201).json({message:"voucherpayment deleted Successfully"});
    
  })


  export const search = asynchandlier(async(req, res)=>{
   
      const query = req.params.query;
      const vouchers = await PaymentVoucherModel.find({
        $or: [
          { serialNumber: { $regex: query, $options: 'i' } },
          { name: { $regex: query, $options: 'i' } }, 
        ],
      });
      res.status(201).json({message:"voucherpayment",data:vouchers});

  
  })


  export const getAll = asynchandlier(async(req, res) => {
  
      const vouchers = await PaymentVoucherModel.find();
      res.json({message:"vouchers data",vouchers});
    
})
  






