'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  Save,
  Search,
  Star,
  Trash2,
} from 'lucide-react';

const inputClass = 'w-full rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-default)] px-3.5 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary-soft)]';
const labelClass = 'block text-xs font-medium text-[var(--text-secondary)] mb-1.5';

function emptyProject() {
  return {
    title: '',
    slug: '',
    category: '',
    siteUrl: '',
    demoDomain: '',
    description: '',
    technologies: '',
    client: '',
    year: '',
    duration: '',
    role: '',
    featured: true,
    published: true,
    sortOrder: 100,
    seoTitle: '',
    seoDescription: '',
    metrics: Array.from({ length: 4 }, () => ({ label: '', value: '' })),
    caseStudy: { summary: '', challenge: '', solution: '', features: '' },
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitLines(value) {
  return value.split(/[\n,]/).map((item) => item.trim()).filter(Boolean);
}

function Field({ label, value, onChange, type = 'text', placeholder = '', required = false, ...props }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClass}
        {...props}
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 4, placeholder = '', required = false }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${inputClass} resize-y leading-relaxed`}
      />
    </label>
  );
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState('');
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/projects', { cache: 'no-store' });
      const result = await response.json();
      if (response.status === 401) {
        window.location.assign('/admin/login');
        return;
      }
      if (!response.ok) throw new Error(result.error || 'Could not load projects.');
      setProjects(result.projects);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function startNewProject() {
    setEditingId('');
    setForm(emptyProject());
    setNotice('');
    setError('');
    document.getElementById('project-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function startEditing(project) {
    setEditingId(project.id);
    setNotice('');
    setError('');
    setForm({
      ...emptyProject(),
      ...project,
      technologies: (project.technologies || []).join(', '),
      metrics: Array.from({ length: 4 }, (_, index) => project.metrics?.[index] || { label: '', value: '' }),
      caseStudy: {
        summary: project.caseStudy?.summary || '',
        challenge: project.caseStudy?.challenge || '',
        solution: project.caseStudy?.solution || '',
        features: (project.caseStudy?.features || []).join('\n'),
      },
    });
    document.getElementById('project-editor')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function updateMetric(index, field, value) {
    setForm((current) => ({
      ...current,
      metrics: current.metrics.map((metric, metricIndex) =>
        metricIndex === index ? { ...metric, [field]: value } : metric
      ),
    }));
  }

  function updateCaseStudy(field, value) {
    setForm((current) => ({
      ...current,
      caseStudy: { ...current.caseStudy, [field]: value },
    }));
  }

  async function saveProject(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');

    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder),
      technologies: splitLines(form.technologies),
      metrics: form.metrics,
      caseStudy: {
        ...form.caseStudy,
        features: splitLines(form.caseStudy.features),
      },
    };

    try {
      const response = await fetch(
        editingId ? `/api/admin/projects/${editingId}` : '/api/admin/projects',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (response.status === 401) {
        window.location.assign('/admin/login');
        return;
      }
      if (!response.ok) throw new Error(result.error || 'Could not save the project.');

      setNotice(editingId ? 'Project updated.' : 'Project added.');
      setEditingId(result.id || editingId);
      await loadProjects();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(project) {
    if (!window.confirm(`Delete “${project.title}”? This cannot be undone.`)) return;
    setError('');
    setNotice('');
    try {
      const response = await fetch(`/api/admin/projects/${project.id}`, { method: 'DELETE' });
      const result = await response.json();
      if (response.status === 401) {
        window.location.assign('/admin/login');
        return;
      }
      if (!response.ok) throw new Error(result.error || 'Could not delete the project.');
      if (editingId === project.id) startNewProject();
      setNotice('Project deleted.');
      await loadProjects();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function logout() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    window.location.assign('/admin/login');
  }

  const filteredProjects = projects.filter((project) =>
    `${project.title} ${project.category} ${project.client}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-accent)] mb-2">ASHISHWEB / ADMIN</p>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">Project dashboard</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-2">Create, edit, publish, and organize your portfolio case studies.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors">
              View site <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button onClick={logout} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-default)] text-sm text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)] transition-colors">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </header>

        {(error || notice) && (
          <div className={`mb-6 rounded-xl border px-4 py-3 text-sm ${error ? 'border-[var(--error)]/40 bg-[var(--error)]/10 text-[var(--error)]' : 'border-[var(--border-teal)] bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)]'}`}>
            {error || notice}
            {error?.includes('MONGODB_URI') && (
              <span> Add your database values to <code>.env.local</code>, then restart the app.</span>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
          <aside className="card-base bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-5 sm:p-6 xl:sticky xl:top-24">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="font-display font-bold text-lg text-[var(--text-primary)]">Projects</h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">{projects.length} total</p>
              </div>
              <button onClick={startNewProject} className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] hover:text-[var(--bg-primary)] px-3 py-2 text-xs font-semibold text-white transition-colors">
                <Plus className="w-4 h-4" /> New
              </button>
            </div>

            <label className="relative block mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects" className={`${inputClass} pl-9`} />
            </label>

            <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1">
              {loading ? (
                <p className="py-5 text-sm text-[var(--text-muted)]">Loading projects…</p>
              ) : filteredProjects.length ? filteredProjects.map((project) => (
                <article key={project.id} className={`rounded-2xl border p-3.5 ${editingId === project.id ? 'border-[var(--border-accent)] bg-[var(--bg-card-hover)]' : 'border-[var(--border-subtle)] bg-[var(--bg-tertiary)]'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-[var(--text-primary)] truncate">{project.title}</h3>
                      <p className="text-xs text-[var(--text-muted)] mt-1 truncate">{project.category}</p>
                    </div>
                    {project.featured && <Star className="w-4 h-4 text-[var(--warning)] shrink-0" />}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-full ${project.published ? 'bg-[var(--accent-secondary-soft)] text-[var(--accent-secondary)]' : 'bg-[var(--bg-card)] text-[var(--text-muted)]'}`}>
                      {project.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {project.published ? 'Published' : 'Draft'}
                    </span>
                    <button onClick={() => startEditing(project)} className="ml-auto text-xs font-semibold text-[var(--text-accent)] hover:text-[var(--accent-secondary)]">Edit</button>
                    <button onClick={() => deleteProject(project)} aria-label={`Delete ${project.title}`} className="p-1 text-[var(--text-muted)] hover:text-[var(--error)] transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              )) : (
                <p className="py-5 text-sm text-[var(--text-muted)]">No projects found. Add the first one.</p>
              )}
            </div>
          </aside>

          <form id="project-editor" onSubmit={saveProject} className="card-base bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-3xl p-5 sm:p-8 space-y-8 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-accent)] mb-1">PROJECT CONTENT</p>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">{editingId ? 'Edit project' : 'Add a project'}</h2>
              </div>
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] hover:text-[var(--bg-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60">
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create project'}
              </button>
            </div>

            <section className="space-y-4">
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">Project details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Project title *" value={form.title} required onChange={(event) => {
                  const title = event.target.value;
                  setForm((current) => ({ ...current, title, ...(editingId ? {} : { slug: slugify(title) }) }));
                }} />
                <Field label="URL slug *" value={form.slug} required onChange={(event) => updateField('slug', slugify(event.target.value))} placeholder="my-project-name" />
                <Field label="Category *" value={form.category} required onChange={(event) => updateField('category', event.target.value)} />
                <Field label="Client / brand" value={form.client} onChange={(event) => updateField('client', event.target.value)} />
                <Field label="Live website URL" type="url" value={form.siteUrl} onChange={(event) => updateField('siteUrl', event.target.value)} placeholder="https://example.com" />
                <Field label="Demo domain or URL" value={form.demoDomain} onChange={(event) => updateField('demoDomain', event.target.value)} placeholder="example.com" />
                <Field label="Technologies" value={form.technologies} onChange={(event) => updateField('technologies', event.target.value)} placeholder="WordPress, Elementor Pro, JetEngine" />
                <Field label="Year" value={form.year} onChange={(event) => updateField('year', event.target.value)} />
                <Field label="Timeline / duration" value={form.duration} onChange={(event) => updateField('duration', event.target.value)} />
                <Field label="Your project role" value={form.role} onChange={(event) => updateField('role', event.target.value)} />
                <Field label="Sort order (smaller comes first)" type="number" value={form.sortOrder} onChange={(event) => updateField('sortOrder', event.target.value)} />
              </div>
              <TextArea label="Short project description *" value={form.description} required rows={3} onChange={(event) => updateField('description', event.target.value)} />
              <div className="flex flex-wrap gap-5">
                <label className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <input type="checkbox" checked={form.published} onChange={(event) => updateField('published', event.target.checked)} className="accent-[var(--accent-primary)]" /> Publish on the site
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <input type="checkbox" checked={form.featured} onChange={(event) => updateField('featured', event.target.checked)} className="accent-[var(--accent-primary)]" /> Feature on homepage
                </label>
              </div>
            </section>

            <section className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
              <div>
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">Case study</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">These fields appear on the project detail page.</p>
              </div>
              <TextArea label="Overview / summary" value={form.caseStudy.summary} rows={4} onChange={(event) => updateCaseStudy('summary', event.target.value)} />
              <TextArea label="The challenge" value={form.caseStudy.challenge} rows={4} onChange={(event) => updateCaseStudy('challenge', event.target.value)} />
              <TextArea label="Your solution" value={form.caseStudy.solution} rows={5} onChange={(event) => updateCaseStudy('solution', event.target.value)} />
              <TextArea label="Key features and deliverables (one per line)" value={form.caseStudy.features} rows={5} onChange={(event) => updateCaseStudy('features', event.target.value)} />
            </section>

            <section className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
              <div>
                <h3 className="font-semibold text-sm text-[var(--text-primary)]">Project metrics</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">Leave a row blank if there is no verified metric to show.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {form.metrics.map((metric, index) => (
                  <div key={index} className="grid grid-cols-2 gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-3">
                    <Field label={`Metric ${index + 1} label`} value={metric.label} onChange={(event) => updateMetric(index, 'label', event.target.value)} placeholder="PageSpeed score" />
                    <Field label="Value" value={metric.value} onChange={(event) => updateMetric(index, 'value', event.target.value)} placeholder="98/100" />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4 border-t border-[var(--border-subtle)] pt-6">
              <h3 className="font-semibold text-sm text-[var(--text-primary)]">Search metadata</h3>
              <Field label="SEO title" value={form.seoTitle} onChange={(event) => updateField('seoTitle', event.target.value)} placeholder="Optional; defaults to the project title" />
              <TextArea label="SEO description" value={form.seoDescription} rows={3} onChange={(event) => updateField('seoDescription', event.target.value)} placeholder="Optional; defaults to the project description" />
            </section>

            <div className="flex flex-wrap justify-between gap-3 border-t border-[var(--border-subtle)] pt-5">
              {editingId ? (
                <button type="button" onClick={startNewProject} className="px-4 py-2.5 rounded-xl border border-[var(--border-default)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] transition-colors">Cancel editing</button>
              ) : <span />}
              <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] hover:text-[var(--bg-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-60">
                <Save className="w-4 h-4" /> {saving ? 'Saving…' : editingId ? 'Save changes' : 'Create project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
