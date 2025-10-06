import { Router } from 'express'

export const gameRouter = Router()

gameRouter.get('/history/:address', async (req, res, next) => {
  try {
    const { address } = req.params
    
    // TODO: Fetch game history from database
    
    res.json({
      success: true,
      data: [],
    })
  } catch (error) {
    next(error)
  }
})

gameRouter.get('/leaderboard', async (req, res, next) => {
  try {
    // TODO: Fetch leaderboard from database
    
    res.json({
      success: true,
      data: [],
    })
  } catch (error) {
    next(error)
  }
})

gameRouter.post('/create', async (req, res, next) => {
  try {
    // TODO: Create new game
    
    res.json({
      success: true,
      data: {
        gameId: 'mock-game-id',
      },
    })
  } catch (error) {
    next(error)
  }
})
