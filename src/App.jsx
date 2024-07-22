import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Login from './pages/Login'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'

function App() {
  useEffect(()=>{
    console.log(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_PATH)
  },[])

  return (
    <div className='App'>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path='/admin' element={<Dashboard />}>
          <Route path='products' element={<AdminProducts />}></Route>
        </Route>
      </Routes>

    </div>
  )
}

export default App
