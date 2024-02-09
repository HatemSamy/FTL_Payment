
import express from 'express';
import { createReceiptVoucher, getReceiptVoucherById, updateReceiptVoucher, deleteReceiptVoucher } from '../Receipt/controller/ReceiptVoucher.js';

const router = express.Router();

// Create a receipt voucher
router.post('/', createReceiptVoucher);

// Get a receipt voucher by ID
router.get('/:id', getReceiptVoucherById);

// Update a receipt voucher
router.put('/:id', updateReceiptVoucher);

// Delete a receipt voucher
router.delete('/:id', deleteReceiptVoucher);

export default router;
