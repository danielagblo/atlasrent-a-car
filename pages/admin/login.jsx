import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
const Lock = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
)
const User = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)
const ArrowRight = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

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
        <title>Admin Login | Atlas Rent-A-Car</title>
      </Head>

      <div className="login-container">
        <div className="login-card">
          <div className="login-brand">
            <div className="brand-logo">
              ATLAS <span>RENT</span>
            </div>
            <h1 className="brand-title">Secure Portal</h1>
            <p className="brand-subtitle">Management authentication required</p>
          </div>

          <form onSubmit={submit} className="login-form">
            <div className="login-field">
              <label>Administrator User</label>
              <div className="input-with-icon">
                <User size={18} className="input-icon" />
                <input
                  placeholder="admin@atlasrent.com"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field">
              <label>Secure Password</label>
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
              <span>{loading ? 'Verifying Credentials...' : 'Access Dashboard'}</span>
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="login-footer">
            <p>&copy; 2026 Atlas Rent-A-Car. Professional Division.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #080810;
          background-image: 
            radial-gradient(at 0% 0%, rgba(36, 39, 111, 0.4) 0, transparent 50%), 
            radial-gradient(at 100% 100%, rgba(223, 151, 56, 0.1) 0, transparent 50%);
          padding: 24px;
          font-family: 'Inter', sans-serif;
        }

        .login-container {
          width: 100%;
          max-width: 480px;
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .login-card {
          background: rgba(21, 21, 37, 0.8);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          padding: 60px;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.6);
        }

        .login-brand {
          text-align: center;
          margin-bottom: 48px;
        }

        .brand-logo {
          font-size: 28px;
          font-weight: 950;
          color: white;
          letter-spacing: 0.1em;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .brand-logo span {
          color: #DF9738;
          font-weight: 400;
        }

        .brand-title {
          font-size: 32px;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .brand-subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 15px;
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
          color: #DF9738;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .input-with-icon input {
          width: 100%;
          height: 64px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 0 24px 0 60px;
          color: white;
          font-size: 16px;
          font-weight: 500;
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .input-with-icon input:focus {
          border-color: #DF9738;
          background: rgba(223, 151, 56, 0.05);
          box-shadow: 0 0 0 4px rgba(223, 151, 56, 0.1);
        }

        .input-with-icon input:focus + .input-icon {
          color: #DF9738;
        }

        .login-error {
          padding: 16px 20px;
          background: rgba(255, 59, 48, 0.1);
          border: 1px solid rgba(255, 59, 48, 0.2);
          color: #FF6B6B;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }

        .login-submit {
          height: 64px;
          background: #24276F;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
          box-shadow: 0 10px 30px rgba(36, 39, 111, 0.4);
        }

        .login-submit:hover:not(:disabled) {
          background: #2d308a;
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -10px rgba(36, 39, 111, 0.6);
          border-color: rgba(255, 255, 255, 0.2);
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
          color: rgba(255, 255, 255, 0.3);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
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
