import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

import Dashboard from './Pages/Dashboard'
import Students from './Pages/Students'
import Teachers from './Pages/Teachers'
import Login from './Pages/Login'

const navItems = [
  { path: '/',         label: 'Home' },
  { path: '/students', label: 'Students' },
  { path: '/teachers', label: 'Teachers' },
]

function Layout({ children }) {
  async function handleLogout() {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white p-4 shadow flex justify-between items-center">
        <h1 className="text-lg font-bold">📚 School System</h1>
        <button
          onClick={handleLogout}
          className="text-sm bg-blue-800 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      <main className="p-4 max-w-2xl mx-auto pb-24">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow flex justify-around">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex-1 text-center py-3 text-sm font-medium transition-colors
              ${isActive ? 'text-blue-700 border-t-2 border-blue-700' : 'text-gray-500'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  const [session, setSession] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    // Check if someone is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setChecking(false)
    })

    // Listen for login and logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Still checking if logged in
  if (checking) return <p className="p-4">Loading...</p>

  // Not logged in — show login page
  if (!session) return <Login />

  // Logged in — show the app
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/students" element={<Layout><Students /></Layout>} />
        <Route path="/teachers" element={<Layout><Teachers /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}