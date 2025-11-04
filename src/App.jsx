import './App.css'
import { Landing } from './pages/landing'
import { Login } from './pages/login'
import { Playlist } from './pages/playlist'
import { Songs } from './pages/songs'
import {Routes, Route} from "react-router-dom"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/playlist" element={<Playlist/>} />
      <Route path="/songs" element={<Songs/>} />
    </Routes>
  )
}

export default App
