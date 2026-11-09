'use client';

import { useRef, useState } from 'react';

type SubscriptionStatus = 'idle' | 'subscribed';

export default function NewsletterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubscriptionStatus>('idle');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));

    try {
      await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
    } catch {
      // The legacy page only ever surfaced the optimistic confirmation state.
    }

    setStatus('subscribed');
    form.reset();
    formRef.current?.querySelector('input')?.blur();
  }

  return (
    <form
      ref={formRef}
      name="newsletter-subscription"
      method="POST"
      data-netlify="true"
      className="flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <input
        type="hidden"
        name="form-name"
        defaultValue="newsletter-subscription"
      />
      <div className="flex items-center bg-surface-clean rounded-xl p-1 border border-border-subtle shadow-sm">
        <input
          name="email"
          required
          className="w-full px-3 py-2 text-xs bg-transparent focus:outline-none text-on-surface"
          placeholder="Your email address..."
          type="email"
        />
        <button
          type="submit"
          className={`text-white px-4 py-2 rounded-lg text-xs font-bold leading-tight whitespace-nowrap shrink-0 transition-colors ${
            status === 'subscribed'
              ? 'bg-emerald-dark'
              : 'bg-primary hover:bg-emerald-dark'
          }`}
        >
          {status === 'subscribed' ? 'Subscribed!' : 'Subscribe'}
        </button>
      </div>
      <span className="text-[11px] text-text-muted">
        Strict privacy. Shariah compliant zero spam guarantee.
      </span>
    </form>
  );
}
