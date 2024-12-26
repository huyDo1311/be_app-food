import express from 'express'
import orderController from '../controllers/order.controller.js';

const orderRouter = express.Router()


// Router order
orderRouter.get('/order-by-user/:userId', orderController.userOrderController);

export default orderRouter