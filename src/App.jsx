import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import PlanATrip from './pages/PlanATrip'
import Trips from './pages/Trips'
import UploadTrip from './pages/UploadTrip'
import SingleTrip from './pages/SingleTrip'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import EditTrip from './pages/EditTrip'
import Profile from './pages/Profile'
import AllApplications from './pages/AllApplications'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/planatrip' element={<PlanATrip />} />
        <Route path='/trips' element={<Trips />} />
        <Route path='/uploadtrip' element={<UploadTrip />} />
        <Route path='/singletrip/:id' element={<SingleTrip />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edittrip/:id' element={<EditTrip/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/applications' element={<AllApplications/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
