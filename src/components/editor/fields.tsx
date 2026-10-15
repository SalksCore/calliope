"use client";

import { useLayoutEffect, useRef } from "react";

/** Zone de texte qui grandit avec son contenu. */
export function AutoText({ id, label, value, onChange, placeholder, rows = 2, big, quote, ariaLabel }: {
  id: string; label?: string; value: string; onChange: (v: string) => void; placeholder?: string;
  rows?: number; big?: boolean; quote?: boolean; ariaLabel?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + 2 + "px";
  }, [value]);
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <textarea ref={ref} id={id} rows={rows} value={value} placeholder={placeholder} aria-label={label ? undefined : ariaLabel || placeholder}
        className={[big && "big", quote && "quote"].filter(Boolean).join(" ") || undefined}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function TextField({ id, label, value, onChange, placeholder, className, ariaLabel }: {
  id: string; label?: string; value: string; onChange: (v: string) => void; placeholder?: string; className?: string; ariaLabel?: string;
}) {
  return (
    <div className="field">
      {label && <label htmlFor={id}>{label}</label>}
      <input type="text" id={id} className={className} value={value} placeholder={placeholder} aria-label={label ? undefined : ariaLabel || placeholder}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export function Block({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="card block">
      <header><span className="n">{String(n).padStart(2, "0")}</span><h2>{title}</h2></header>
      {hint && <p className="hint">{hint}</p>}
      <div className="stack">{children}</div>
    </section>
  );
}

export function RemoveButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button className="x" type="button" title={label} aria-label={label} onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>
  );
}

export function AddButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button className="add" type="button" onClick={onClick}>+ {children}</button>;
}
