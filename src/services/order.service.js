import models from '../common/sequelize/init.sequelize.js';


const orderService = {

    userOrderService: async (userId) => {
        try {

            // Kiểm tra tham số đầu vào
            if (!userId) {
                return {
                    status: 'error',
                    code: 400,
                    message: 'User ID (userId) is required',
                    orders: [],
                };
            }

            // Truy xuất danh sách đơn hàng với tên món ăn
            const orders = await models.orders.findAll({
                where: { user_id: userId },
                attributes: ['order_id', 'food_id', 'amount', 'code', 'arr_sub_id', 'created_at'],
                include: [
                    {
                        model: models.food, // Join với bảng food
                        as: "food",
                        attributes: ['food_name'], // Chỉ lấy cột food_name
                    },
                ],
            });

            // Kiểm tra nếu không có đơn hàng
            if (!orders.length) {
                return {
                    status: 'success',
                    code: 200,
                    message: 'No orders found for this user',
                    orders: [],
                };
            }

            // Trả về danh sách đơn hàng nếu có
            return {
                status: 'success',
                code: 200,
                message: 'Orders fetched successfully',
                orders,
            };
        } catch (error) {
            console.error('Error fetching orders by user:', error.stack);

            // Xử lý lỗi và trả về thông báo
            return {
                status: 'error',
                code: 500,
                message: 'Unable to fetch orders for this user',
                error: error.message,
            };
        }
    },
}


export default orderService