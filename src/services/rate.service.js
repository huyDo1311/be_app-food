import models from "../common/sequelize/init.sequelize.js";

const rateService = {
    // Thêm hoặc cập nhật đánh giá nhà hàng
    addRate: async (userId, resId, amount) => {
        try {
            // Kiểm tra xem người dùng đã đánh giá nhà hàng này chưa
            const existingRate = await models.rate_res.findOne({
                where: { user_id: userId, res_id: resId },
            });

            if (existingRate) {
                // Nếu đã có đánh giá, cập nhật lại số sao
                existingRate.amount = amount;
                existingRate.date_rate = new Date(); // Cập nhật thời gian đánh giá
                await existingRate.save();

                return {
                    message: 'Rate updated successfully',
                    rate: existingRate
                };
            }

            // Nếu chưa có, tạo mới đánh giá
            const newRate = await models.rate_res.create({
                user_id: userId,
                res_id: resId,
                amount,
                date_rate: new Date(),
            });

            return {
                message: 'Rate added successfully',
                rate: newRate
            };
        } catch (error) {
            console.error('Error adding or updating rate:', error);
            throw new Error('Unable to process rate request');
        }
    },
    // Lấy danh sách đánh giá theo nhà hàng
    getRatesByRestaurant: async (resId) => {
        try {
            // Kiểm tra tham số đầu vào
            if (!resId) {
                throw new Error('Restaurant ID (resId) is required');
            }

            // Truy xuất danh sách đánh giá theo `resId`
            const rates = await models.rate_res.findAll({
                where: { res_id: resId },
                attributes: ['user_id', 'amount', 'date_rate'], // Chỉ lấy các cột cần thiết
            });

            if (!rates.length) {
                return { message: 'No rates found for this restaurant', rates: [] };
            }

            return {
                message: 'Rates fetched successfully',
                rates
            };
        } catch (error) {
            console.error('Error fetching rates by restaurant:', error);
            throw new Error('Unable to fetch rates for this restaurant');
        }
    },
    // Lấy danh sách đánh giá theo user
    getRatesByUser: async (userId) => {
        try {
            // Kiểm tra tham số đầu vào
            if (!userId) {
                throw new Error('User ID (userId) is required');
            }

            // Truy xuất danh sách đánh giá theo `userId`
            const rates = await models.rate_res.findAll({
                where: { user_id: userId },
                attributes: ['res_id', 'amount', 'date_rate'], // Chỉ lấy các cột cần thiết
            });

            if (!rates.length) {
                return { message: 'No rates found for this user', rates: [] };
            }

            return {
                message: 'Rates fetched successfully',
                rates
            };
        } catch (error) {
            console.error('Error fetching rates by user:', error);
            throw new Error('Unable to fetch rates for this user');
        }
    },

}

export default rateService