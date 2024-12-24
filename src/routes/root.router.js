import express from 'express'
import likeRouter from './like.router.js'

const rootRouter = express.Router()

rootRouter.get(`/`, async (req, res, next) => {
    res.json(`ok`)
})

rootRouter.use('/like', likeRouter)

export default rootRouter