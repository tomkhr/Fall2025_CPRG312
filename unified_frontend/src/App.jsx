import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import CachingHome from './pages/CachingHome';
import Home from './pages/Home';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/caching_demo' element={<CachingHome/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
