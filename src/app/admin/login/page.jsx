'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LockKeyhole, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setPending(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Could not sign in.');
      window.location.assign('/admin');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[var(--bg-secondary)]">
      <section className="w-full max-w-md card-base bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-7 sm:p-9 shadow-2xs">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--accent-primary-soft)] text-[var(--text-accent)] border border-[var(--border-accent)]">
            <LockKeyhole className="w-5 h-5" />
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-muted)]">ASHISHWEB</p>
            <h1 className="font-display text-xl font-bold text-[var(--text-primary)]">Admin sign in</h1>
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          Sign in to manage portfolio projects and case studies.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Username</span>
            <input
              autoComplete="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              className="w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] px-3.5 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary-soft)]"
            />
          </label>

          <label className="block">
            <span className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Password</span>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] px-3.5 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary-soft)]"
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl border border-[var(--error)]/40 bg-[var(--error)]/10 px-3.5 py-3 text-sm text-[var(--error)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] hover:text-[var(--bg-primary)] px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 disabled:opacity-60"
          >
            <ShieldCheck className="w-4 h-4" />
            {pending ? 'Signing in…' : 'Sign in to dashboard'}
          </button>
        </form>

        <Link href="/" className="inline-block mt-6 text-xs text-[var(--text-muted)] hover:text-[var(--accent-secondary)] transition-colors">
          Back to portfolio
        </Link>
      </section>
    </main>
  );
}
