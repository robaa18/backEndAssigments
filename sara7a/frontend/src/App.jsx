import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import { authApi, messagesApi } from './api.js'

const AuthContext = createContext(null)
const readUser = () => {
  try { return JSON.parse(sessionStorage.getItem('sara7a-user')) } catch { return null }
}
const saveUser = (user) => {
  sessionStorage.setItem('sara7a-user', JSON.stringify(user))
  return user
}
function useAuth() { return useContext(AuthContext) }

export default function App() {
  const [user, setUser] = useState(readUser)
  const login = (next) => setUser(saveUser(next))
  const logout = () => { sessionStorage.removeItem('sara7a-user'); setUser(null) }
  return <AuthContext.Provider value={{ user, login, logout }}>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/forgot-password" element={<ResetPage />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
      <Route path="/u/:username" element={<PublicProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AuthContext.Provider>
}

function Brand({ light = false }) {
  return <Link className={`brand ${light ? 'brand-light' : ''}`} to="/"><span className="brand-mark">s</span><span>sara7a</span></Link>
}
function Notice({ kind = 'error', children }) {
  return children ? <div role="alert" className={`notice notice-${kind}`}>{children}</div> : null
}
function Button({ children, busy, ...props }) {
  return <button className="button" disabled={busy || props.disabled} {...props}>{busy ? 'Please wait…' : children}</button>
}
function Field({ label, ...props }) {
  return <label className="field"><span>{label}</span><input required {...props} /></label>
}

function GoogleSignIn({ onSuccess, onError, disabled }) {
  const container = useRef(null)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!clientId || !container.current) return

    let cancelled = false
    const renderButton = () => {
      if (cancelled || !window.google?.accounts?.id || !container.current) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          setSubmitting(true)
          try {
            await authApi.google(credential)
            const encodedPayload = credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
            const binaryPayload = atob(encodedPayload)
            const bytes = Uint8Array.from(binaryPayload, (character) => character.charCodeAt(0))
            const identity = JSON.parse(new TextDecoder().decode(bytes))
            onSuccess({ name: identity.name || identity.email?.split('@')[0] || 'Friend', email: identity.email })
          } catch (error) {
            onError(error.message)
            setSubmitting(false)
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      container.current.replaceChildren()
      window.google.accounts.id.renderButton(container.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: Math.min(container.current.clientWidth, 400),
        logo_alignment: 'left',
      })
    }

    if (window.google?.accounts?.id) {
      renderButton()
    } else {
      let script = document.getElementById('google-identity-services')
      const onLoad = () => renderButton()
      if (!script) {
        script = document.createElement('script')
        script.id = 'google-identity-services'
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.addEventListener('load', onLoad)
        script.addEventListener('error', () => onError('Google sign-in could not load. Check your connection and try again.'), { once: true })
        document.head.appendChild(script)
      } else {
        script.addEventListener('load', onLoad)
        if (window.google?.accounts?.id) renderButton()
      }
    }

    return () => { cancelled = true }
  }, [clientId, onError, onSuccess])

  if (!clientId) return <button className="google-config" type="button" disabled title="Set VITE_GOOGLE_CLIENT_ID in frontend/.env">G <span>Continue with Google</span><small>Set VITE_GOOGLE_CLIENT_ID to enable</small></button>
  return <div className={`google-button ${(disabled || submitting) ? 'google-button-disabled' : ''}`} ref={container} aria-busy={submitting} />
}

function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const { login } = useAuth()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const handleGoogleSuccess = useCallback((identity) => {
    login(identity)
    navigate('/dashboard')
  }, [login, navigate])
  const handleGoogleError = useCallback((message) => setError(message), [])
  const submit = async (event) => {
    event.preventDefault(); setError(''); setBusy(true)
    const form = Object.fromEntries(new FormData(event.currentTarget))
    try {
      if (isRegister) {
        await authApi.register({ name: form.name, email: form.email, password: form.password })
        navigate(`/verify?email=${encodeURIComponent(form.email)}`, { state: { fresh: true } })
      } else {
        await authApi.login({ email: form.email, password: form.password })
        login({ name: form.email.split('@')[0], email: form.email })
        navigate('/dashboard')
      }
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <div className="auth-layout"><aside className="auth-art"><Brand light /><div className="art-copy"><span className="eyebrow">A little honesty goes a long way</span><h1>Say what you<br />really mean.</h1><p>Send and receive honest thoughts, without the pressure of a name attached.</p><div className="quote-card"><span className="quote-mark">“</span><p>Sometimes the kindest thing is simply telling the truth.</p><small>ANONYMOUSLY, OF COURSE</small></div></div><span className="art-foot">A softer place for honest words.</span></aside>
    <main className="auth-main"><div className="auth-mobile-brand"><Brand /></div><div className="auth-box"><span className="eyebrow">{isRegister ? 'YOUR SPACE STARTS HERE' : 'WELCOME BACK'}</span><h2>{isRegister ? 'Create your account' : 'Sign in to Sara7a'}</h2><p className="muted">{isRegister ? 'Get your own link and start receiving messages.' : 'Your inbox is right where you left it.'}</p><Notice>{error}</Notice>
      {!isRegister && <><GoogleSignIn disabled={busy} onSuccess={handleGoogleSuccess} onError={handleGoogleError} /><div className="auth-divider"><span />or continue with email<span /></div></>}
      <form onSubmit={submit} className="form-stack">{isRegister && <Field label="Name" name="name" autoComplete="name" minLength="3" maxLength="20" placeholder="How should we call you?" />}<Field label="Email address" name="email" type="email" autoComplete="email" placeholder="you@example.com" /><Field label="Password" name="password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} minLength="6" placeholder="At least 6 characters" />{!isRegister && <Link className="inline-link align-right" to="/forgot-password">Forgot password?</Link>}<Button type="submit" busy={busy}>{isRegister ? 'Create account' : 'Sign in'} <span aria-hidden="true">↗</span></Button></form>
      <p className="switch-auth">{isRegister ? 'Already have an account?' : 'New to Sara7a?'} <Link className="inline-link" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Sign in' : 'Create an account'}</Link></p><p className="legal-note">By continuing, you agree to use Sara7a with kindness.</p></div></main></div>
}

function VerifyPage() {
  const navigate = useNavigate()
  const emailFromUrl = new URLSearchParams(location.search).get('email') || ''
  const [email, setEmail] = useState(emailFromUrl)
  const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [done, setDone] = useState(false)
  const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { const code = new FormData(event.currentTarget).get('code'); await authApi.verify({ email, value: code }); setDone(true) } catch (err) { setError(err.message) } finally { setBusy(false) } }
  return <CenteredForm title="Verify your email" intro="Enter the six digit code we sent to your inbox." error={error}>
    {done ? <><Notice kind="success">Your account is verified. You can sign in now.</Notice><Link className="button button-link" to="/login">Continue to sign in ↗</Link></> : <form className="form-stack" onSubmit={submit}><Field label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><Field label="Verification code" name="code" inputMode="numeric" pattern="[0-9]{6}" minLength="6" maxLength="6" placeholder="000000" /><Button type="submit" busy={busy}>Verify account ↗</Button><button className="text-button" type="button" disabled={busy} onClick={async () => { setError(''); try { await authApi.sendOtp({ email }); setError('A new code has been sent.') } catch (err) { setError(err.message) } }}>Resend code</button></form>}
    <button className="text-button" onClick={() => navigate('/login')}>Back to sign in</button>
  </CenteredForm>
}

function ResetPage() {
  const [step, setStep] = useState(0); const [email, setEmail] = useState(''); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const [done, setDone] = useState(false)
  const sendCode = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { await authApi.sendOtp({ email }); setStep(1) } catch (err) { setError(err.message) } finally { setBusy(false) } }
  const reset = async (event) => { event.preventDefault(); setBusy(true); setError(''); const form = new FormData(event.currentTarget); if (form.get('password') !== form.get('confirm')) { setError('The passwords do not match.'); setBusy(false); return } try { await authApi.resetPassword({ email, value: form.get('code'), password: form.get('password') }); setDone(true) } catch (err) { setError(err.message) } finally { setBusy(false) } }
  return <CenteredForm title={done ? 'Password updated' : 'Reset your password'} intro={done ? 'Your new password is ready. Sign in to continue.' : step ? `Enter the code sent to ${email} and choose a new password.` : 'We will send a short verification code to your email.'} error={error}>{done ? <Link className="button button-link" to="/login">Back to sign in ↗</Link> : step ? <form className="form-stack" onSubmit={reset}><Field label="Six digit code" name="code" inputMode="numeric" pattern="[0-9]{6}" maxLength="6" required placeholder="000000" /><Field label="New password" name="password" type="password" minLength="6" required /><Field label="Confirm new password" name="confirm" type="password" minLength="6" required /><Button busy={busy}>Save new password ↗</Button></form> : <form className="form-stack" onSubmit={sendCode}><Field label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" /><Button busy={busy}>Send reset code ↗</Button></form>}<Link className="inline-link" to="/login">Back to sign in</Link></CenteredForm>
}

function CenteredForm({ title, intro, error, children }) {
  return <div className="center-page"><header className="simple-header"><Brand /></header><main className="center-card"><span className="eyebrow">ACCOUNT SECURITY</span><h1>{title}</h1><p className="muted">{intro}</p><Notice>{error}</Notice>{children}</main></div>
}

function Landing() {
  return <div className="landing"><header className="landing-header"><Brand /><nav><Link to="/login">Sign in</Link><Link className="button button-small" to="/register">Get your link ↗</Link></nav></header><main className="hero"><div className="hero-copy"><span className="eyebrow">HONEST WORDS, SHARED ANONYMOUSLY</span><h1>A little more<br /><em>real talk.</em></h1><p>Give your friends a safe space to say what they’ve been meaning to. No names, no awkwardness—just honest words.</p><div className="hero-actions"><Link className="button" to="/register">Get your personal link <span>↗</span></Link><Link className="quiet-link" to="/login">I already have an account</Link></div><div className="trust-note"><span className="tiny-avatar">✳</span> Your identity stays yours. Messages stay honest.</div></div><div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="hero-sticker">say it<br />with care</div><article className="floating-note note-one"><span className="note-top"><i/> A NOTE FOR YOU</span><p>You make people feel seen. I hope you know that.</p><small>JUST NOW · ANONYMOUS</small></article><article className="floating-note note-two"><span className="note-top"><i/> A NOTE FOR YOU</span><p>Keep going. You're closer than you think.</p><small>2 MIN AGO · ANONYMOUS</small></article><div className="hero-spark spark-a">✳</div><div className="hero-spark spark-b">✳</div></div></main><section className="how"><span className="eyebrow">THREE EASY STEPS</span><h2>Honesty, made simple.</h2><div className="steps"><Step number="01" title="Make your link" body="Create your account and get a personal inbox link."/><Step number="02" title="Share it around" body="Send it to friends or drop it in your bio."/><Step number="03" title="Hear the truth" body="Get thoughtful messages, completely anonymously."/></div></section><footer className="landing-footer"><Brand /><span>A softer place for honest words.</span><Link to="/register">Get started ↗</Link></footer></div>
}
function Step({ number, title, body }) { return <article className="step"><span>{number}</span><h3>{title}</h3><p>{body}</p></article> }

function Dashboard() {
  const { user, logout } = useAuth(); const [messages, setMessages] = useState([]); const [error, setError] = useState(''); const [copied, setCopied] = useState(false); const [loading, setLoading] = useState(true)
  const profileLink = `${location.origin}/u/${encodeURIComponent(user?.name || '')}`
  const load = async () => { setLoading(true); setError(''); try { const { data } = await messagesApi.inbox(); setMessages(data.data?.messages ?? data.data ?? []) } catch (err) { setError(`${err.message} The messages API is not available yet.`) } finally { setLoading(false) } }
  useEffect(() => { load() }, [])
  const copy = async () => { try { await navigator.clipboard.writeText(profileLink); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setError('Could not copy link. Please copy it from the address field.') } }
  return <div className="dashboard"><aside className="dash-sidebar"><Brand /><div className="side-label">YOUR SPACE</div><a className="side-item active" href="#inbox">◫ <span>Inbox</span><b>{messages.length}</b></a><a className="side-item" href="#share">↗ <span>Share your link</span></a><div className="sidebar-bottom"><div className="user-avatar">{user?.name?.[0]?.toUpperCase() || 'S'}</div><div className="user-meta"><strong>{user?.name}</strong><span>{user?.email}</span></div><button className="icon-button" onClick={logout} title="Sign out" aria-label="Sign out">↗</button></div></aside><main className="dash-main"><header className="dash-top"><div><span className="eyebrow">YOUR PRIVATE SPACE</span><h1>Hey, {user?.name} <span>✳</span></h1><p className="muted">Here’s what people are saying.</p></div><button className="button button-outline" onClick={load}>↻ <span>Refresh inbox</span></button></header><section className="share-card" id="share"><div className="share-icon">↗</div><div className="share-copy"><span className="eyebrow">YOUR PERSONAL LINK</span><p>{profileLink}</p></div><button className="button" onClick={copy}>{copied ? 'Copied ✓' : 'Copy link ↗'}</button></section><section className="inbox-section" id="inbox"><div className="section-heading"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Your inbox <span className="count-pill">{messages.length}</span></h2></div><button className="quiet-link" onClick={load}>Refresh ↻</button></div><Notice>{error}</Notice>{loading ? <div className="empty-card">Loading your messages…</div> : messages.length ? <div className="message-list">{messages.map((message) => <article className="message-card" key={message._id}><div className="message-icon">✳</div><div className="message-content"><p>{message.content}</p><span>{new Date(message.createdAt).toLocaleString()}</span></div><span className="anonymous-tag">ANONYMOUS</span></article>)}</div> : <div className="empty-card"><span className="empty-flower">✳</span><h3>Your inbox is taking a breath.</h3><p>Share your link with friends. Their honest thoughts will show up here.</p><button className="button button-outline" onClick={copy}>{copied ? 'Copied ✓' : 'Copy your link ↗'}</button></div>}</section></main></div>
}

function PublicProfile() {
  const { username } = useParams(); const [profile, setProfile] = useState(null); const [content, setContent] = useState(''); const [error, setError] = useState(''); const [sent, setSent] = useState(false); const [busy, setBusy] = useState(false)
  const load = async () => { try { const { data } = await messagesApi.publicProfile(username); setProfile(data.data?.user ?? data.data) } catch (err) { setError(`${err.message} Public profile lookup is not available yet.`) } }
  useEffect(() => { load() }, [username])
  const submit = async (event) => { event.preventDefault(); setBusy(true); setError(''); try { if (!profile?._id) throw new Error('This profile is not available yet.'); await messagesApi.send(profile._id, content); setSent(true); setContent('') } catch (err) { setError(`${err.message} Message sending is not available yet.`) } finally { setBusy(false) } }
  return <div className="public-page"><header className="simple-header"><Brand /></header><main className="public-card"><span className="profile-avatar">{username?.[0]?.toUpperCase() || '✳'}</span><span className="eyebrow">A NOTE, JUST FOR THEM</span><h1>Send {profile?.name || username} an honest message.</h1><p className="muted">Your name won’t be attached. Say something kind, real, or both.</p>{sent ? <div className="sent-state"><span>✳</span><h2>Message sent.</h2><p>Thanks for sharing a little honesty.</p><button className="button button-outline" onClick={() => setSent(false)}>Send another</button></div> : <form className="form-stack" onSubmit={submit}><label className="field"><span>Your message</span><textarea value={content} onChange={(e) => setContent(e.target.value)} minLength="1" maxLength="200" required placeholder="Type something honest…" rows="5"/><small>{content.length}/200</small></label><Notice>{error}</Notice><Button busy={busy}>Send anonymously ↗</Button></form>}<span className="public-note">No account needed. Keep it kind.</span></main></div>
}
