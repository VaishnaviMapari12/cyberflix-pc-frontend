import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { API_BASE } from '../data/api.js'

const API_URL = API_BASE

export default function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const submit = async (event) => {
        event.preventDefault()

        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        setLoading(true)

        try {
            const response = await fetch(
                `${API_URL}/users/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            )

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Registration failed'
                )
            }

            setSuccess('Account created successfully!')

            setTimeout(() => {
                navigate('/login')
            }, 800)

        } catch (err) {
            console.error('Register Error:', err)
            setError(
                err.message ||
                'Unable to create account'
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
                    Create your account.
                </h1>

                <p className="lead">
                    Create an account to save builds,
                    manage your profile, and shop PC components.
                </p>

                <form onSubmit={submit}>

                    <label>
                        Full name

                        <input
                            required
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />
                    </label>

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
                            placeholder="Minimum 6 characters"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </label>

                    <label>
                        Confirm password

                        <input
                            required
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </label>

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
                            ? 'Creating account...'
                            : 'Create account ↗'}
                    </button>

                </form>

                <p className="auth-switch">
                    Already have an account?{' '}
                    <Link to="/login">
                        Sign in
                    </Link>
                </p>

            </div>
        </section>
    )
}