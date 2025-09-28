import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import CachingHome from './pages/CachingHome';
import Home from './pages/Home';
import PasswordHashing from './pages/PasswordHashing';
import HomeBtn from './components/HomeBtn';
import LoginUser from './components/passwordLab/LoginUser';
import RegisterUserForm from './components/passwordLab/RegisterUserForm';

function App() {

  return (
    <>
      
      <Router>
        <HomeBtn />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/caching_demo' element={<CachingHome/>} />
          <Route path='/password_hashing_demo' element={<PasswordHashing/>}>
            <Route path='/password_hashing_demo/login' element={<LoginUser/>} />
            <Route path='/password_hashing_demo/register' element={<RegisterUserForm/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
