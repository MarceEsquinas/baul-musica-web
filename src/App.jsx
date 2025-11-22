import './App.css'
import { Landing } from './pages/landing'
import { Login } from './pages/login'
import { Playlist } from './pages/playlist'
import { PlaylistDetail } from "./pages/playListDetails";
import { Songs } from './pages/songs'
import {Routes, Route} from "react-router-dom"
import { ProtectedRoute } from './components/protectedRoute'
import { Register } from './pages/register'
import { PublicList } from './pages/PublicList';
import { AdminPanel } from "./pages/adminPanel";



function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route element={<ProtectedRoute/>}>
       <Route path="/playlist" element={<Playlist/>} />
        <Route path="/playlist/:id" element={<PlaylistDetail />} />
       <Route path="/songs" element={<Songs/>} />
       <Route path="/PublicList" element={<PublicList/>} />
       <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  )
}

export default App
