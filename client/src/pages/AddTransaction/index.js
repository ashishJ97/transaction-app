import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddTransaction = () => {
  const navigate = useNavigate()

  const [transactionData, setTransactionData] = useState({
    type: 'credit',
    amount: null,
    desc: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTransactionData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    if (transactionData.amount == null) return

    try {
      const response = await fetch('http://localhost:5000/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...transactionData })
      })

      if (response.status === 200) {
        onCancel()
      }
    } catch (error) {
      console.log('Error fetching transactions: ', error)
    }
  }

  const onCancel = () => navigate('/')

  return (
    <div className='add-transaction'>
      <h3>New Transaction</h3>
      <form>
        <div>
          <label htmlFor='type'>Transaction Type: </label>
          <select
            name='type'
            value={transactionData.type}
            onChange={handleInputChange}
          >
            <option value='credit'>credit</option>
            <option value='debit'>debit</option>
          </select>
        </div>

        <div>
          <label htmlFor='amount'>Amount: </label>
          <input
            type='number'
            name='amount'
            value={transactionData.amount}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor='desc'>Description: </label>
          <textarea
            type='text'
            name='desc'
            value={transactionData.desc}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <button type='submit' onClick={onSubmitForm}>
            Save
          </button>
          <button type='button' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTransaction
