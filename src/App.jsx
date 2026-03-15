
import Reccomendations from './components/Reccomendations'
import Search from './components/Search'
import { Routes, Route } from "react-router-dom"



function App() {

  return (
    <div className='w-screen h-screen'>
      <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/movie/:id" element={<Reccomendations />} />
    </Routes>
    </div>
  )
}

export default App
