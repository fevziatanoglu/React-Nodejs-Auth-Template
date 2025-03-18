import './App.css'
import RootLayout from './layouts/RootLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/root/Dashboard'
import NotFound from './pages/NotFound'

import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        {/* Root layout */}
        <Route element={<RootLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
        {/* Auth layout */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
