import { Router } from 'express'
import { z } from 'zod'

export const authRouter = Router()

const loginSchema = z.object({
  address: z.string(),
  signature: z.string(),
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const { address, signature } = loginSchema.parse(req.body)
    
    // TODO: Verify signature
    // TODO: Generate JWT token
    
    res.json({
      success: true,
      data: {
        address,
        token: 'mock-jwt-token',
      },
    })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/logout', async (req, res, next) => {
  try {
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})
