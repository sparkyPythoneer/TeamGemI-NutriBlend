import { useState } from 'react'
import './App.css'
import Signup from './Features/Signup'
import Login from './Features/Login'
import Landingpage from './Features/Landingpage'
import { BrowserRouter,Routes, Route} from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
