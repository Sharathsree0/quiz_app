
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Quizpage from './pages/Quizpage'
import Adminlog from './components/Admin/Adminlog'
import AdminDashboard from './components/Admin/AdminDashboard'

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/quiz' element={<Quizpage/>} />
      <Route path='/adminlogin' element={<Adminlog/>} />
      <Route path='/admindashboard' element={<AdminDashboard/>} /> 
    </Routes>
   </>
  )
}

export default App