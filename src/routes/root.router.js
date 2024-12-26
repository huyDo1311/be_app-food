import express from 'express'
import likeRouter from './like.router.js'
import rateRouter from './rate.router.js'
import orderRouter from './order.router.js'

const rootRouter = express.Router()

rootRouter.get(`/`, async (req, res, next) => {
    res.json(`ok`)
})

rootRouter.use('/like', likeRouter)

rootRouter.use('/rate', rateRouter)

rootRouter.use('/order', orderRouter)

export default rootRouter