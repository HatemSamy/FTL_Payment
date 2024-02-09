import express from 'express';
import * as PaymentVoucherController from './controller/PaymentVoucher.js';

const router = express.Router();

router.post('/', PaymentVoucherController.create);
router.get('/:id', PaymentVoucherController.getById);
router.put('/:id', PaymentVoucherController.update);
router.delete('/:id', PaymentVoucherController.deletePayment);
router.get('/', PaymentVoucherController.getAll); 
router.get('/search/:query', PaymentVoucherController.search); 
export default router;