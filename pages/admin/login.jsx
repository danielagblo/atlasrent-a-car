import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Lock, User, ArrowRight } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: email, pass: password })
      })
      const body = await res.json()
      if (!res.ok) throw new Error(body?.message || 'Login failed')
      localStorage.setItem('admin_token', body.token)
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err.message || String(err))
    } finally { setLoading(false) }
  }

  return (
    <div className="login-page">
      <Head>
        <title>Admin Login | EKG Logistics</title>
      </Head>

      <div className="login-container">
        <div className="login-card">
          <div className="login-brand">
            <div className="brand-logo">EKG</div>
            <h1 className="brand-title">Welcome Back</h1>
            <p className="brand-subtitle">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={submit} className="login-form">
            <div className="login-field">
              <label>Email Address</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>Password</label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button className="login-submit" type="submit" disabled={loading}>
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="login-footer">
            <p>Protected area. Authorized access only.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          background-image: 
            radial-gradient(at 0% 0%, rgba(227, 6, 19, 0.15) 0, transparent 50%), 
            radial-gradient(at 100% 100%, rgba(227, 6, 19, 0.05) 0, transparent 50%);
          padding: 24px;
          font-family: inherit;
        }

        .login-container {
          width: 100%;
          max-width: 480px;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-card {
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 60px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
        }

        .login-brand {
          text-align: center;
          margin-bottom: 48px;
        }

        .brand-logo {
          width: 80px;
          height: 80px;
          background: #E30613;
          color: white;
          font-size: 28px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          margin: 0 auto 28px;
          box-shadow: 0 20px 40px -10px rgba(227, 6, 19, 0.4);
          transform: rotate(-5deg);
        }

        .brand-title {
          font-size: 32px;
          font-weight: 900;
          color: white;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .brand-subtitle {
          color: rgba(255, 255, 255, 0.4);
          font-size: 16px;
          font-weight: 500;
        }

        .login-form {
          display: grid;
          gap: 28px;
        }

        .login-field label {
          display: block;
          font-size: 11px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }

        .input-with-icon input {
          width: 100%;
          height: 64px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 0 24px 0 60px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-with-icon input:focus {
          border-color: rgba(227, 6, 19, 0.5);
          background: rgba(227, 6, 19, 0.02);
          box-shadow: 0 0 0 4px rgba(227, 6, 19, 0.1);
        }

        .input-with-icon input:focus + .input-icon {
          color: #E30613;
        }

        .login-error {
          padding: 16px 20px;
          background: rgba(227, 6, 19, 0.1);
          border: 1px solid rgba(227, 6, 19, 0.2);
          color: #FF3B30;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }

        .login-submit {
          height: 64px;
          background: #E30613;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 16px;
          font-weight: 900;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-submit:hover:not(:disabled) {
          background: #ff071a;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -10px rgba(227, 6, 19, 0.5);
        }

        .login-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .login-footer {
          margin-top: 48px;
          text-align: center;
          color: rgba(255, 255, 255, 0.2);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 40px 24px;
            border-radius: 32px;
          }
          .brand-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  )
}

AdminLogin.noLayout = true
