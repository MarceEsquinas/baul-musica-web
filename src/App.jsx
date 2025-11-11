import './App.css'
import { Landing } from './pages/landing'
import { Login } from './pages/login'
import { Playlist } from './pages/playlist'
import { Songs } from './pages/songs'
import {Routes, Route} from "react-router-dom"
import { ProtectedRoute } from './components/protectedRoute'
import { Register } from './pages/register'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route element={<ProtectedRoute/>}>
       <Route path="/playlist" element={<Playlist/>} />
       <Route path="/songs" element={<Songs/>} />
      </Route>
    </Routes>
  )
}

export default App
