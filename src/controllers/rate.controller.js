import { responseSuccess, responseError } from '../common/helpers/response.helper.js';
import rateService from '../services/rate.service.js';

const rateController = {
    // Thêm đánh giá nhà hàng
    rateAdd: async (req, res) => {
        const { userId, resId, amount } = req.body; // Lấy userId, resId và amount từ request body

        try {
            const result = await rateService.addRate(userId, resId, amount);
            const resData = responseSuccess(result, `Rate Successfully`, 200);
            return res.status(200).json(resData);
        } catch (error) {
            console.error('Error rating restaurant:', error);
            return res.status(500).json(responseError(null, 'Error processing rate request', 500));
        }
    },

    // Lấy danh sách đánh giá theo nhà hàng
    getRatesByRestaurant: async (req, res) => {
        const { resId } = req.params; // Lấy resId từ request params

        try {
            const rates = await rateService.getRatesByRestaurant(resId);
            const resData = responseSuccess(rates, `Get rates successfully`, 200);
            return res.status(200).json(resData);
        } catch (error) {
            console.error('Error fetching rates for restaurant:', error);
            return res.status(500).json(responseError(null, 'Error fetching rates', 500));
        }
    },

    // Lấy danh sách đánh giá theo user
    getRatesByUser: async (req, res) => {
        const { userId } = req.params; // Lấy userId từ request params

        try {
            const rates = await rateService.getRatesByUser(userId);
            const resData = responseSuccess(rates, `Get user rates successfully`, 200);
            return res.status(200).json(resData);
        } catch (error) {
            console.error('Error fetching rates for user:', error);
            return res.status(500).json(responseError(null, 'Error fetching user rates', 500));
        }
    },
};

export default rateController;
