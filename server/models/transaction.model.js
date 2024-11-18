import mongoose from 'mongoose'

const transactionSchema = mongoose.Schema(
  {
    type: { type: String, enum: ['credit', 'debit'], required: true },
    amount: { type: Number, required: true },
    desc: { type: String, required: false },
    balance: { type: Number, required: true, default: 0 }
    // prevBalance: { type: Number, required: true },
    // currBalance: { type: Number, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('Transaction', transactionSchema)
