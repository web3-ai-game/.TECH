import { Router } from 'express'

export const userRouter = Router()

userRouter.get('/profile/:address', async (req, res, next) => {
  try {
    const { address } = req.params
    
    // TODO: Fetch user from database
    
    res.json({
      success: true,
      data: {
        address,
        username: null,
        stats: {
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
        },
      },
    })
  } catch (error) {
    next(error)
  }
})

userRouter.put('/profile', async (req, res, next) => {
  try {
    // TODO: Update user profile
    
    res.json({
      success: true,
      data: req.body,
    })
  } catch (error) {
    next(error)
  }
})
