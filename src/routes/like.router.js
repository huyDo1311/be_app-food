import express from 'express'
import likeController from '../controllers/like.controller.js';

const likeRouter = express.Router()


// Route để lấy danh sách like theo nhà hàng
likeRouter.get('/like-list', likeController.likeList);

// Route để like một nhà hàng (POST)
likeRouter.post('/like-restaurant', likeController.likeRestaurant);

// Route để unlike một nhà hàng (POST)
likeRouter.post('/unlike-restaurant', likeController.unlikeRestaurant);

// Route để lấy danh sách like của user theo userId (GET)
likeRouter.get('/likes/user/:userId', likeController.getLikesByUser);



export default likeRouter