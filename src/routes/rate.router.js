import express from 'express'
import rateController  from '../controllers/rate.controller.js';

const rateRouter = express.Router()

// thêm đánh giá (POST)
rateRouter.post('/rate-add', rateController.rateAdd);

// lấy danh sách đánh giá theo nhà hàng
rateRouter.get('/rate-by-res/:resId', rateController.getRatesByRestaurant);

// lấy danh sách đánh giá theo nhà theo user
rateRouter.get('/rate-by-user/:userId', rateController.getRatesByUser);



export default rateRouter