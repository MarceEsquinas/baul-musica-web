import './App.css'
import { Landing } from './pages/landing'
import { Login } from './pages/login'
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/playlist" element={<Landing/>} />
    </Routes>
  )
}

export default App
