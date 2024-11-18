import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import TransactionTable from './pages/Transactions'
import AddTransaction from './pages/AddTransaction'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TransactionTable />} />
        <Route path='/add_transaction' element={<AddTransaction />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
