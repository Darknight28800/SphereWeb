'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Image from 'next/image';

const KEY = 'sw-intro-played';
const STAR_COUNT = 52;

type Phase = 'loading' | 'warp' | 'flash' | 'done';

export default function IntroLoader() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('loading');

  const stars = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => {
        const angle = (i / STAR_COUNT) * 360 + Math.random() * 7 - 3.5;
        return {
          angle,
          delay: Math.random() * 0.22,
          offset: 46 + Math.random() * 120,
        };
      }),
    [],
  );

  useEffect(() => {
    let played = true;
    try {
      played = sessionStorage.getItem(KEY) === '1';
    } catch {
      played = false;
    }
    if (played) {
      document.documentElement.removeAttribute('data-intro');
      return;
    }

    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setActive(true);

    const schedule: [Phase, number][] = reduce
      ? [['done', 500]]
      : [
          ['warp', 900],
          ['flash', 1620],
          ['done', 1980],
        ];

    const ids = schedule.map(([p, t]) => window.setTimeout(() => setPhase(p), t));

    return () => {
      ids.forEach((id) => clearTimeout(id));
    };
  }, []);

  useEffect(() => {
    if (phase !== 'done') return;
    const t = window.setTimeout(() => {
      setActive(false);
      document.documentElement.removeAttribute('data-intro');
    }, 420);
    return () => clearTimeout(t);
  }, [phase]);

  if (!active) return null;

  return (
    <div
      className={`intro intro--${phase}`}
      role="presentation"
      aria-hidden="true"
      onClick={() => setPhase('done')}
    >
      <div className="intro__stars">
        {stars.map((s, i) => (
          <span
            key={i}
            className="intro__star"
            style={
              {
                '--a': `${s.angle}deg`,
                '--o': `${s.offset}px`,
                '--delay': `${s.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <div className="intro__core">
        <span className="intro__ring" />
        <Image
          src="/logo-sphere.png"
          alt=""
          width={148}
          height={148}
          priority
          className="intro__sphere"
        />
      </div>

      <p className="intro__label">
        chargement<span>.</span>
        <span>.</span>
        <span>.</span>
      </p>

      <div className="intro__flash" />
    </div>
  );
}
