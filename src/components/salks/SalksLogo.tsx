// Copie de freelance/sites/_salks : ne pas modifier ici, relancer sync.mjs.
import { useId } from 'react';

/**
 * « Salks. » : le S porte sa barre, le point ferme le mot.
 * Même tracé que Chronos et la bannière du profil GitHub.
 */
export function SalksLogo({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={`sk-salks ${className}`} viewBox="-30 -116 440 124" role="img" aria-label="Salks.">
      <mask id={`sk${id}`} maskUnits="userSpaceOnUse" x="-60" y="-220" width="520" height="300">
        <rect x="-60" y="-220" width="520" height="300" fill="#fff" />
        <polygon points="-26,6 44,6 84,-47 9,-47" fill="#000" />
      </mask>
      <text className="w" x="0" y="0" fontSize="150" fontWeight="800" letterSpacing="-5" mask={`url(#sk${id})`}>Salks</text>
      <polygon className="a" points="-18,0 38,0 68,-36 12,-36" />
      <circle className="a" cx="386" cy="-17" r="17" />
    </svg>
  );
}
