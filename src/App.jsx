import React from 'react'
import AdminDashboard from './components/Admin/AdminDashboard'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import Quizpage from './pages/Quizpage'
import Adminlog from './components/Admin/Adminlog'
function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/quiz' element={<Quizpage/>} />
      <Route path='/adminlogin' element={<Adminlog/>} />
    </Routes>
   </>
  )
}

export default App