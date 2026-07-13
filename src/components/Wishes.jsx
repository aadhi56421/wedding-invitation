import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Send } from 'lucide-react';
import { Divider } from './Ornament';

export function Wishes() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/wishes')
      .then((res) => res.json())
      .then(setWishes)
      .catch(() => setError('Could not load wishes right now.'))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) throw new Error('request failed');
      const created = await res.json();
      setWishes((prev) => [created, ...prev]);
      setName('');
      setMessage('');
    } catch {
      setError('Something went wrong sending your wish — please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="wishes" className="bg-cream relative px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-gold-dark text-xs tracking-[0.35em] uppercase">
          Leave a note
        </p>
        <h2 className="font-script text-maroon mt-2 text-5xl sm:text-6xl">
          Wishes
        </h2>
        <Divider className="my-8" />

        <form
          onSubmit={handleSubmit}
          className="border-gold-light/60 shadow-soft rounded-xl border bg-white/60 p-6 text-left sm:p-8"
        >
          <label className="text-maroon/80 text-sm font-medium" htmlFor="wish-name">
            Your name
          </label>
          <input
            id="wish-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            required
            placeholder="e.g. Sarah"
            className="border-gold-light/60 focus:border-gold text-maroon mt-1 mb-4 w-full rounded-lg border bg-white px-4 py-2 outline-none"
          />

          <label
            className="text-maroon/80 text-sm font-medium"
            htmlFor="wish-message"
          >
            Your wish
          </label>
          <textarea
            id="wish-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={500}
            required
            rows={4}
            placeholder="Share your wishes for the couple..."
            className="border-gold-light/60 focus:border-gold text-maroon mt-1 mb-4 w-full resize-none rounded-lg border bg-white px-4 py-2 outline-none"
          />

          {error && <p className="mb-3 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="bg-maroon hover:bg-maroon-light inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm tracking-widest text-cream uppercase transition-colors disabled:opacity-60"
          >
            <Send size={16} />
            {submitting ? 'Sending…' : 'Send Wish'}
          </button>
        </form>

        <div className="mt-10 space-y-4 text-left">
          {loading && (
            <p className="text-maroon/60 text-center">Loading wishes…</p>
          )}
          {!loading && wishes.length === 0 && (
            <p className="text-maroon/60 text-center">
              Be the first to leave a wish!
            </p>
          )}
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border-gold-light/60 rounded-lg border bg-white/50 px-5 py-4"
            >
              <div className="flex items-center gap-2">
                <Heart size={14} className="text-gold-dark" />
                <span className="font-display text-maroon font-semibold">
                  {wish.name}
                </span>
              </div>
              <p className="text-maroon/80 mt-2 whitespace-pre-wrap">
                {wish.message}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
