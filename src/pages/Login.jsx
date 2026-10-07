import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { API_BASE } from '../data/api.js'

const API_URL = API_BASE

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [keepSignedIn, setKeepSignedIn] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const submit = async (event) => {
        event.preventDefault()

        setError('')
        setSuccess('')
        setLoading(true)

        try {
            const response = await fetch(
                `${API_URL}/users/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Login failed'
                )
            }

            // Save logged-in user
            const storage = keepSignedIn
                ? localStorage
                : sessionStorage

            storage.setItem(
                'cyberflixUser',
                JSON.stringify(result.data)
            )

            setSuccess('Login successful!')

            setTimeout(() => {
                navigate('/profile')
            }, 500)

        } catch (err) {
            console.error('Login Error:', err)

            setError(
                err.message ||
                'Unable to login. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="sec auth-page">
            <div className="auth-card panel">

                <p className="kicker">
                    CYBERFLIX ACCOUNT
                </p>

                <h1>
                    Welcome back.
                </h1>

                <p className="lead">
                    Sign in to review orders, save builds,
                    and manage your profile.
                </p>

                <form onSubmit={submit}>

                    <label>
                        Email address

                        <input
                            required
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Password

                        <input
                            required
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </label>

                    <div className="form-row">

                        <label className="check-label">

                            <input
                                type="checkbox"
                                checked={keepSignedIn}
                                onChange={(e) =>
                                    setKeepSignedIn(
                                        e.target.checked
                                    )
                                }
                            />

                            Keep me signed in

                        </label>

                        <button
                            className="link"
                            type="button"
                            onClick={() =>
                                alert(
                                    'Password reset feature coming soon.'
                                )
                            }
                        >
                            Forgot password?
                        </button>

                    </div>

                    {error && (
                        <p className="form-error" role="alert">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="form-success" role="status">
                            {success}
                        </p>
                    )}

                    <button
                        className="btn"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? 'Signing in...'
                            : 'Sign in ↗'}
                    </button>

                </form>

                <p className="auth-switch">
                    New to Cyberflix?{' '}
                    <Link to="/register">
                        Create your profile
                    </Link>
                </p>

            </div>
        </section>
    )
}
