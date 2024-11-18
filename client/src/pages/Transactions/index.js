import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import './style.css'

const Transactions = () => {
  const navigate = useNavigate()

  const [transactionData, setTransactionData] = useState({})

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await response.json()
        setTransactionData(data)
      } catch (error) {
        console.log('Error fetching transactions: ', error)
      }
    }
    fetchTransactions()
  }, [])

  return (
    <div className='transaction-table'>
      <table>
        <thead>
          <tr className=''>
            <th>Office Transactions</th>
            <th>
              <button
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/add_transaction')}
              >
                Add Transaction
              </button>
            </th>
          </tr>
          <tr className='header-row'>
            <th className='column-cell'>Date</th>
            <th className='column-cell'>Description</th>
            <th className='column-cell'>Credit</th>
            <th className='column-cell'>Debit</th>
            <th className='column-cell'>Running Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.transactions?.length !== 0 &&
            transactionData?.transactions?.map((item) => (
              <tr key={item._id} className='header-row'>
                <td className='data-cell'>
                  {moment(item.createdAt).format('DD/MM/YYYY hh:mm a')}
                </td>
                <td className='data-cell'>{item.desc}</td>
                <td className='data-cell'>
                  {item.type === 'credit' ? item.amount : '-'}
                </td>
                <td className='data-cell'>
                  {item.type === 'debit' ? item.amount : '-'}
                </td>
                <td className='data-cell'>{item.balance}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Transactions
