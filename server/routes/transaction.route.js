import express from 'express'
import {
  getTransactions,
  addTransaction
} from '../controllers/transactions.controller.js'

export const router = express.Router()

router.get('/transactions', getTransactions)
router.post('/transactions', addTransaction)
