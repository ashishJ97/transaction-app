import Transaction from '../models/transaction.model.js'
import Balance from '../models/balance.model.js'

export const getTransactions = async (req, res) => {
  try {
    const balance = await Balance.findOne()
    const transactions = await Transaction.find().sort({ createdAt: -1 })
    res.json({ transactions, balance: balance.currentBalance })
  } catch (error) {
    res.status(500).json({ error: 'Error while fethcing transactions.' })
  }
}

export const addTransaction = async (req, res) => {
  try {
    const { type, amount, desc = '' } = req.body
    const transactionAmount = parseInt(amount)

    if (!['credit', 'debit'].includes(type.toLowerCase())) {
      return res.status(400).json({ error: 'Incorrect transaction type.' })
    }

    let balance = await Balance.findOne()
    if (!balance) {
      balance = new Balance({ currentBalance: 0 })
      await balance.save()
    }

    if (type === 'debit') {
      if (balance.currentBalance <= 0) {
        return res.status(400).json({ error: 'Insufficient funds.' })
      }
      if (transactionAmount > balance.currentBalance) {
        return res
          .status(400)
          .json({ error: 'Debit amount exceeds the balance' })
      }
    }

    if (type === 'debit') {
      balance.currentBalance -= transactionAmount
    } else {
      balance.currentBalance += transactionAmount
    }
    await balance.save()

    const transactions = new Transaction({
      type,
      amount: transactionAmount,
      desc,
      balance: balance.currentBalance
    })
    await transactions.save()

    res.json({ transactions, balance: balance.currentBalance })
  } catch (error) {
    res.status(500).json({ error: 'Error while fethcing transactions.' })
  }
}
