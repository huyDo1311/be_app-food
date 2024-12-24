import models from '../common/sequelize/init.sequelize.js';


const likeService = {
    // Like nhà hàng
    likeRestaurant: async (userId, resId) => {
        // Kiểm tra xem user đã like nhà hàng này chưa
        const existingLike = await models.like_res.findOne({
            where: { user_id: userId, res_id: resId },
        });

        if (existingLike) {
            // Nếu đã like, thực hiện unlike (xóa bản ghi like)
            await models.like_res.destroy({
                where: { user_id: userId, res_id: resId },
            });
            // Lấy thông tin nhà hàng và số lượt like
            const restaurantData = await models.restaurant.findOne({
                where: { res_id: resId },
                attributes: [
                    'res_id',
                    [models.Sequelize.fn('COUNT', models.Sequelize.col('like_res.res_id')), 'like_count'], // Đếm số lượt like
                    'res_name', // Đổi tên cột thành res_name (hoặc tên chính xác cột của bạn)
                ],
                include: [
                    {
                        model: models.like_res,
                        as: 'like_res',
                        attributes: [], // Không cần lấy thông tin chi tiết của like_res
                    },
                ],
                group: ['restaurant.res_id'], // Nhóm theo res_id để đếm lượt like
            });

            // Trả về thông tin nhà hàng kèm số lượt like
            return {
                
                res_id: restaurantData.res_id,
                like_count: restaurantData.get('like_count'), // Số lượt like
                'like_restaurant.res_name': restaurantData.res_name, // Tên nhà hàng
            };
        } else {
            // Nếu chưa like, tạo lượt like mới
            await models.like_res.create({
                user_id: userId,
                res_id: resId,
                date_like: new Date(),
            });
            // Lấy thông tin nhà hàng và số lượt like
            const restaurantData = await models.restaurant.findOne({
                where: { res_id: resId },
                attributes: [
                    'res_id',
                    [models.Sequelize.fn('COUNT', models.Sequelize.col('like_res.res_id')), 'like_count'], // Đếm số lượt like
                    'res_name', // Đổi tên cột thành res_name (hoặc tên chính xác cột của bạn)
                ],
                include: [
                    {
                        model: models.like_res,
                        as: 'like_res',
                        attributes: [], // Không cần lấy thông tin chi tiết của like_res
                    },
                ],
                group: ['restaurant.res_id'], // Nhóm theo res_id để đếm lượt like
            });

            // Trả về thông tin nhà hàng kèm số lượt like
            return {

                res_id: restaurantData.res_id,
                like_count: restaurantData.get('like_count'), // Số lượt like
                'like_restaurant.res_name': restaurantData.res_name, // Tên nhà hàng
            };
        }

        // if (existingLike) {
        //     return { message: 'User đã like nhà hàng này.' };
        // }

        // // Tạo lượt like mới
        // await models.like_res.create({
        //     user_id: userId,
        //     res_id: resId,
        //     date_like: new Date(),
        // });

        // // return { message: 'Like thành công.' };

        // // Lấy thông tin nhà hàng và số lượt like
        // const restaurantData = await models.restaurant.findOne({
        //     where: { res_id: resId },
        //     attributes: [
        //         'res_id',
        //         [models.Sequelize.fn('COUNT', models.Sequelize.col('like_res.res_id')), 'like_count'], // Đếm số lượt like
        //         'res_name', // Đổi tên cột thành res_name (hoặc tên chính xác cột của bạn)
        //     ],
        //     include: [
        //         {
        //             model: models.like_res,
        //             as: 'like_res',
        //             attributes: [], // Không cần lấy thông tin chi tiết của like_res
        //         },
        //     ],
        //     group: ['restaurant.res_id'], // Nhóm theo res_id để đếm lượt like
        // });

        // // Trả về thông tin nhà hàng kèm số lượt like
        // return {
        //     res_id: restaurantData.res_id,
        //     like_count: restaurantData.get('like_count'), // Số lượt like
        //     'like_restaurant.res_name': restaurantData.res_name, // Tên nhà hàng
        // };
    },

    // Unlike nhà hàng
    unlikeRestaurant: async (userId, resId) => {
        const existingLike = await models.like_res.findOne({
            where: { user_id: userId, res_id: resId },
        });

        if (!existingLike) {
            return { message: 'User chưa like nhà hàng này.' };
        }

        // Xóa lượt like
        await models.like_res.destroy({
            where: { user_id: userId, res_id: resId },
        });

        return { message: 'Unlike thành công.' };
    },

    // Lấy danh sách like theo nhà hàng
    getLikesByRestaurant: async () => {
        const likes = await models.like_res.findAll({
            attributes: [
                'res_id',
                [models.Sequelize.fn('COUNT', models.Sequelize.col('like_id')), 'like_count'],
            ],
            include: [
                {
                    model: models.restaurant,  // Liên kết với bảng 'restaurant'
                    as: 'like_restaurant',  // Đảm bảo alias trùng khớp
                    attributes: ['res_name'],  // Chỉ lấy tên nhà hàng
                }
            ],
            group: ['res_id', 'like_restaurant.res_name'],  // Nhóm theo cả 'res_id' và 'like_restaurant.res_name'
            raw: true,
        });

        return likes;
    },

    // Lấy danh sách like theo user
    getLikesByUser: async (userId) => {
        const likes = await models.like_res.findAll({
            where: { user_id: userId },
            attributes: ['res_id', 'date_like'],
            include: [
                {
                    model: models.restaurant,
                    as: 'like_restaurant', 
                    attributes: ['res_name', 'description'],
                },
            ],
            raw: true,
        });

        return likes;
    },
}

export default likeService