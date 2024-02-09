import { Error } from 'mongoose';
import ReceiptVoucherModel from '../../../../DB/model/receiptVoucher.model.js';
import PDFDocument from 'pdfkit';
import fs from 'fs';

import { asynchandlier } from '../../../services/erroeHandling.js';

export const createReceiptVoucher = asynchandlier(async (req, res) => {
  
    const voucher = await ReceiptVoucherModel.create(req.body);
    const doc = new PDFDocument();
    const pdfPath = `pdf/Receipt_voucher_${voucher._id}.pdf`;
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(20).text('Receipt Voucher Details', { align: 'center' });
    doc.fontSize(14).text(`Serial Number: ${voucher.serialNumber}`);
    doc.end();
   res.status(201).json({message:"ReceiptVoucher_Pdf created successfully",voucher});

})

export const getReceiptVoucherById = asynchandlier(async (req, res) => {
 
    const voucher = await ReceiptVoucherModel.findById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ error: 'ReceiptVoucher not found' });
    }
   res.status(201).json({message:"ReceiptVoucher",voucher});
 
})

export const updateReceiptVoucher =asynchandlier( async (req, res) => {
    const voucherFoud = await ReceiptVoucherModel.findById(req.params.id);
    if (!voucherFoud) {
      return next (new Error("Voucher not found"))
    }
    const voucher = await ReceiptVoucherModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!voucher) {
      return res.status(404).json({ error: ' faill  to Update Voucher ' });
    }
    return res.status(404).json({ error: ' ReceiptVoucher Updated succssfully ' });

  
})

export const deleteReceiptVoucher = asynchandlier(async (req, res) => {
    const voucherFoud = await ReceiptVoucherModel.findById(req.params.id);
    if (!voucherFoud) {
      return next (new Error("Voucher not found"))
    }
    const voucher = await ReceiptVoucherModel.findByIdAndDelete(req.params.id);
    if (!voucher) {
      return res.status(404).json({ error: 'ReceiptVoucher not found' });
    }
    return res.status(404).json({ error: ' ReceiptVoucher Updated succssfully ' });

  
})

