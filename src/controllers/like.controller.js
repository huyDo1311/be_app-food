import { responseSuccess } from '../common/helpers/response.helper.js';
import likeService from '../services/like.service.js';

const likeController = {
       // Like nhà hàng
       likeRestaurant: async (req, res) => {
        const { userId, resId } = req.body; // Lấy userId và resId từ request body

        try {
            const result = await likeService.likeRestaurant(userId, resId);

            const resData = responseSuccess(result, `Like Successfully`, 200)
            return res.status(200).json(resData);
        } catch (error) {
            console.error('Error liking restaurant:', error);
            return res.status(500).json({ message: 'Error processing like request' });
        }
    },

    // Unlike nhà hàng
    unlikeRestaurant: async (req, res) => {
        const { userId, resId } = req.body; // Lấy userId và resId từ request body

        try {
            const result = await likeService.unlikeRestaurant(userId, resId);
            return res.status(200).json(result);
        } catch (error) {
            console.error('Error unliking restaurant:', error);
            return res.status(500).json({ message: 'Error processing unlike request' });
        }
    },

    // Lấy danh sách like theo nhà hàng
    likeList: async (req, res) => {
        try {
            const likes = await likeService.getLikesByRestaurant();
            return res.status(200).json(likes);
        } catch (error) {
            console.error('Error fetching likes:', error);
            return res.status(500).json({ message: 'Error fetching like list' });
        }
    },

    // Lấy danh sách like theo user
    getLikesByUser: async (req, res) => {
        const { userId } = req.params; // Lấy userId từ tham số URL

        try {
            const likes = await likeService.getLikesByUser(userId);
            const resData = responseSuccess(likes, `Get User Like List Successfully`, 200)
            
            return res.status(200).json(resData);
        } catch (error) {
            console.error('Error fetching likes by user:', error);
            return res.status(500).json({ message: 'Error fetching user likes' });
        }
    }
}

export default likeController