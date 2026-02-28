import React from 'react';

// Example trust badges (replace with real logos or SVGs for production)
const TRUST_BADGES = [
  { id: 1, label: '5-Star Service', icon: '⭐️' },
  { id: 2, label: 'Fully Insured', icon: '🛡️' },
  { id: 3, label: '24/7 Support', icon: '📞' },
  { id: 4, label: 'Verified Fleet', icon: '✅' },
];

export default function TrustBadges() {
  return (
    <section style={{ padding: '24px 60px', display: 'flex', justifyContent: 'center', gap: 36, margin: '32px 0' }}>
      {TRUST_BADGES.map(badge => (
        <div key={badge.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--surface)', borderRadius: 12, padding: '18px 28px', boxShadow: 'var(--shadow)', minWidth: 120 }}>
          <span style={{ fontSize: 32, marginBottom: 8 }}>{badge.icon}</span>
          <span style={{ fontWeight: 600, color: 'var(--accent-2)' }}>{badge.label}</span>
        </div>
      ))}
    </section>
  );
}
