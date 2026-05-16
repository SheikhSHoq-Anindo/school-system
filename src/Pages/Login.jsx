import { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin() {
        setLoading(true)
        setError('')

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            setError(error.message)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">

                <h1 className="text-2xl font-bold text-blue-700 mb-2">School System</h1>
                <p className="text-gray-500 text-sm mb-6">Sign in to continue</p>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border rounded p-2 w-full"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border rounded p-2 w-full"
                    />
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="bg-blue-700 text-white rounded p-2 font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    )
}