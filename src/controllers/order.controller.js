import { responseSuccess } from '../common/helpers/response.helper.js';
import orderService from '../services/order.service.js';

const orderController = {
       // Like nhà hàng
       userOrderController: async (req, res) => {
        // const { userId } = req.body; // Lấy userId và resId từ request body
        const userId = req.params.userId

        try {
            const result = await orderService.userOrderService(userId);

            const resData = responseSuccess(result, `Get user order successfully`, 200)
            return res.status(200).json(resData);
        } catch (error) {
            console.error('Error user order:', error);
            return res.status(500).json({ message: 'Error processing user order' });
        }
    }
}

export default orderController