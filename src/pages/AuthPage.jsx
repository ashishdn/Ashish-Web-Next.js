import React, { useEffect, useState } from 'react';
import { ArrowLeft, Building2, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthPage({ initialMode = 'login', adminRequired = false, destination }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { authClient, user, isAdmin } = useAuth();
  const { navigate, queryParams } = useRouter();
  const nextPath = destination || queryParams.next || (adminRequired ? '/admin' : '/landlord/dashboard');

  useEffect(() => {
    if (user && (!adminRequired || isAdmin)) navigate(isAdmin ? '/admin' : nextPath);
  }, [user, isAdmin, adminRequired, nextPath, navigate]);
  if (user) {
    if (adminRequired && !isAdmin) return <Notice text="This page is only available to the site administrator." />;
    return null;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true); setError(''); setMessage('');
    try {
      if (mode === 'signup') {
        const result = await authClient.signUp.email({ name, email, password, callbackURL: nextPath });
        if (result.error) throw new Error(result.error.message || 'Could not create your account.');
        setMessage('Account created. Check your inbox and verify your email before signing in.');
      } else {
        const result = await authClient.signIn.email({ email, password, callbackURL: nextPath });
        if (result.error) {
          if (result.error.status === 403) setMessage('Your email still needs verification. Check your inbox or request a new link below.');
          throw new Error(result.error.message || 'Could not sign in.');
        }
        navigate(nextPath);
      }
    } catch (err) { setError(err.message || 'Something went wrong.'); }
    finally { setBusy(false); }
  };

  const handleGoogle = async () => {
    setBusy(true); setError('');
    const result = await authClient.signIn.social({ provider: 'google', callbackURL: nextPath });
    if (result.error) { setError(result.error.message || 'Google sign-in is unavailable.'); setBusy(false); }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6">
      <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-9">
        <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-emerald-800"><ArrowLeft className="h-4 w-4" /> Back to home</Link>
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800"><Building2 className="h-6 w-6" /></div>
        <h1 className="text-2xl font-bold text-stone-900">{adminRequired ? 'Administrator sign in' : mode === 'signup' ? 'Create your account' : 'Welcome back'}</h1>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">{adminRequired ? 'Use an address listed in ADMIN_EMAILS. Only allowlisted accounts receive administrator access.' : 'Sign in to post a home and keep track of your listings.'}</p>

        <button type="button" disabled={busy} onClick={handleGoogle} className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-stone-200 px-4 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 disabled:opacity-60">
          <GoogleMark /> Continue with Google
        </button>
        <div className="my-5 flex items-center gap-3 text-xs text-stone-400"><span className="h-px flex-1 bg-stone-200" />or use email<span className="h-px flex-1 bg-stone-200" /></div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && <label className="block text-sm font-medium text-stone-700">Full name<input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 w-full rounded-xl border border-stone-200 px-3.5 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10" /></label>}
          <label className="block text-sm font-medium text-stone-700">Email<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 w-full rounded-xl border border-stone-200 px-3.5 py-3 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10" /></label>
          <label className="block text-sm font-medium text-stone-700">Password<div className="relative mt-1.5"><input required minLength={8} type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-stone-200 px-3.5 py-3 pr-11 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 text-stone-400" aria-label="Toggle password visibility">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {message && <div role="status" className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}{mode === 'login' && email && <button type="button" onClick={async () => { const result = await authClient.sendVerificationEmail({ email, callbackURL: nextPath }); setMessage(result.error ? (result.error.message || 'Could not send another email.') : 'A new verification link has been sent.'); }} className="mt-2 block font-semibold underline">Send a new verification link</button>}</div>}
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900 disabled:opacity-60">{busy && <LoaderCircle className="h-4 w-4 animate-spin" />}{mode === 'signup' ? 'Create account' : 'Sign in'}</button>
        </form>
        <p className="mt-6 text-center text-sm text-stone-500">{mode === 'signup' ? 'Already have an account?' : 'New to BachelorBari?'}{' '}<Link to={adminRequired ? (mode === 'signup' ? '/admin/login' : '/admin/signup') : (mode === 'signup' ? '/login' : '/signup')} className="font-semibold text-emerald-800 hover:text-emerald-950">{mode === 'signup' ? 'Sign in' : 'Create an account'}</Link></p>
      </section>
    </div>
  );
}

function Notice({ text }) { return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-stone-600">{text}</div>; }
function GoogleMark() { return <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.88c-.58 2.96-2.25 5.48-4.73 7.18l7.72 5.99c4.51-4.17 7.11-10.31 7.11-17.64Z"/><path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.95 23.95 0 0 0 0 21.56l7.98-6.19Z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.72-5.99c-2.14 1.44-4.88 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"/></svg>; }
