import mongoose from 'mongoose'

const balanceSchema = mongoose.Schema(
  {
    currentBalance: { type: Number, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('Balance', balanceSchema)
