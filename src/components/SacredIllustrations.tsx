import React from 'react';

interface SvgProps {
  className?: string;
}

export const GoldenCrossSvg: React.FC<SvgProps> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="crossGold" x1="12" y1="6" x2="52" y2="74" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F3D36B" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8A6A12" />
      </linearGradient>
    </defs>
    <path
      d="M32 6C30 6 28.5 7.5 28.5 9.5V24H14C12 24 10.5 25.5 10.5 27.5C10.5 29.5 12 31 14 31H28.5V70.5C28.5 72.5 30 74 32 74C34 74 35.5 72.5 35.5 70.5V31H50C52 31 53.5 29.5 53.5 27.5C53.5 25.5 52 24 50 24H35.5V9.5C35.5 7.5 34 6 32 6Z"
      fill="url(#crossGold)"
    />
    <path
      d="M32 10V70M14 27.5H50"
      stroke="#FFFDF8"
      strokeOpacity="0.45"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="32" cy="27.5" r="2.2" fill="#FFFDF8" fillOpacity="0.85" />
  </svg>
);

export const WhiteDoveSvg: React.FC<SvgProps & { flip?: boolean }> = ({
  className = 'w-16 h-12',
  flip = false,
}) => (
  <svg
    viewBox="0 0 96 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="doveBody" x1="12" y1="12" x2="80" y2="54" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="70%" stopColor="#F5FAFE" />
        <stop offset="100%" stopColor="#CFE6F5" />
      </linearGradient>
      <linearGradient id="doveWing" x1="26" y1="6" x2="54" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DCEEF9" />
      </linearGradient>
    </defs>
    {/* Back wing */}
    <path
      d="M42 29C35 16 26 9 16 7C20 15 24 23 32 30"
      fill="url(#doveWing)"
      stroke="#B9D9EE"
      strokeWidth="1"
    />
    {/* Body & tail */}
    <path
      d="M12 43C18 40 24 38 30 37C35 30 43 26 53 26C59 26 64 23 68 19C71 16 76 16 79 19C81 21 82 22 85 22.5C82.5 24 80.5 24.5 79 25C77 32 71 39 60 43C48 47 34 48 16 49C13 49 10 45 12 43Z"
      fill="url(#doveBody)"
      stroke="#C6E0F2"
      strokeWidth="1.1"
    />
    {/* Front uplifted wing */}
    <path
      d="M36 33C31 18 37 7 49 4C49 12 52 21 56 29C49 32 42 33 36 33Z"
      fill="#FFFFFF"
      stroke="#C6E0F2"
      strokeWidth="1.1"
    />
    {/* Feather accent lines */}
    <path
      d="M44 12C43 18 45 24 48 28M39 16C39 21 41 26 43 30"
      stroke="#CFE6F5"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Eye */}
    <circle cx="74" cy="20.5" r="1.1" fill="#556272" />
    {/* Tiny olive sprig in beak */}
    <path
      d="M84 22.5C88 23 91 21 93 19M87 22.5C88 24.5 90 25.5 92 25"
      stroke="#8A6A12"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export const ChaliceWithHostSvg: React.FC<SvgProps> = ({ className = 'w-40 h-44' }) => (
  <svg
    viewBox="0 0 180 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Cáliz dorado con hostia sagrada y espigas de trigo"
  >
    <defs>
      <radialGradient id="sacredGlow" cx="50%" cy="35%" r="50%">
        <stop offset="0%" stopColor="#F3D36B" stopOpacity="0.55" />
        <stop offset="60%" stopColor="#CFE6F5" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#FFFDF8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="chaliceGold" x1="55" y1="68" x2="125" y2="178" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F8E28C" />
        <stop offset="40%" stopColor="#D4AF37" />
        <stop offset="85%" stopColor="#9A7616" />
        <stop offset="100%" stopColor="#7A5B0E" />
      </linearGradient>
      <linearGradient id="wheatGold" x1="30" y1="90" x2="150" y2="175" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F3D36B" />
        <stop offset="100%" stopColor="#A9821B" />
      </linearGradient>
    </defs>

    {/* Soft ambient halo */}
    <circle cx="90" cy="72" r="68" fill="url(#sacredGlow)" />

    {/* Light rays around host */}
    <g stroke="#D4AF37" strokeOpacity="0.45" strokeLinecap="round" strokeWidth="1.2">
      <line x1="90" y1="10" x2="90" y2="22" />
      <line x1="90" y1="78" x2="90" y2="85" />
      <line x1="52" y1="48" x2="62" y2="48" />
      <line x1="118" y1="48" x2="128" y2="48" />
      <line x1="63" y1="21" x2="70" y2="28" />
      <line x1="117" y1="21" x2="110" y2="28" />
      <line x1="63" y1="75" x2="70" y2="68" />
      <line x1="117" y1="75" x2="110" y2="68" />
    </g>

    {/* Sacred Host */}
    <circle
      cx="90"
      cy="48"
      r="22"
      fill="#FFFDF8"
      stroke="#D4AF37"
      strokeWidth="1.5"
    />
    <circle cx="90" cy="48" r="18" stroke="#F3D36B" strokeOpacity="0.6" strokeWidth="0.9" />
    <path
      d="M90 36V60M82 44H98"
      stroke="#D4AF37"
      strokeWidth="1.6"
      strokeLinecap="round"
    />

    {/* Left wheat stalk */}
    <g stroke="url(#wheatGold)" fill="url(#wheatGold)" fillOpacity="0.85">
      <path d="M68 168C50 148 39 124 34 92" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="35" cy="96" rx="3" ry="6" transform="rotate(-25 35 96)" />
      <ellipse cx="42" cy="105" rx="3" ry="6" transform="rotate(-10 42 105)" />
      <ellipse cx="33" cy="111" rx="3" ry="6" transform="rotate(-38 33 111)" />
      <ellipse cx="47" cy="118" rx="3" ry="6" transform="rotate(-12 47 118)" />
      <ellipse cx="38" cy="126" rx="3" ry="6" transform="rotate(-40 38 126)" />
      <ellipse cx="53" cy="133" rx="3" ry="5.5" transform="rotate(-16 53 133)" />
    </g>

    {/* Right wheat stalk */}
    <g stroke="url(#wheatGold)" fill="url(#wheatGold)" fillOpacity="0.85">
      <path d="M112 168C130 148 141 124 146 92" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="145" cy="96" rx="3" ry="6" transform="rotate(25 145 96)" />
      <ellipse cx="138" cy="105" rx="3" ry="6" transform="rotate(10 138 105)" />
      <ellipse cx="147" cy="111" rx="3" ry="6" transform="rotate(38 147 111)" />
      <ellipse cx="133" cy="118" rx="3" ry="6" transform="rotate(12 133 118)" />
      <ellipse cx="142" cy="126" rx="3" ry="6" transform="rotate(40 142 126)" />
      <ellipse cx="127" cy="133" rx="3" ry="5.5" transform="rotate(16 127 133)" />
    </g>

    {/* Chalice Cup */}
    <path
      d="M58 76H122C122 103 108 119 90 119C72 119 58 103 58 76Z"
      fill="url(#chaliceGold)"
    />
    {/* Cup rim highlight */}
    <ellipse cx="90" cy="76" rx="32" ry="4" fill="#F8E28C" stroke="#B68E23" strokeWidth="0.9" />
    {/* Cup embossed cross */}
    <path d="M90 88V106M83 94H97" stroke="#FFFDF8" strokeOpacity="0.7" strokeWidth="1.6" strokeLinecap="round" />

    {/* Stem & node */}
    <rect x="85.5" y="118" width="9" height="40" rx="2" fill="url(#chaliceGold)" />
    <ellipse cx="90" cy="136" rx="10" ry="6.5" fill="url(#chaliceGold)" stroke="#FFFDF8" strokeOpacity="0.4" strokeWidth="0.8" />

    {/* Base */}
    <path
      d="M66 172C66 162 76 157 90 157C104 157 114 162 114 172H66Z"
      fill="url(#chaliceGold)"
    />
    <rect x="61" y="172" width="58" height="5" rx="2.5" fill="#8A6A12" />
  </svg>
);

export const TwinklingStarSvg: React.FC<SvgProps> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 2L14.2 9.8L22 12L14.2 14.2L12 22L9.8 14.2L2 12L9.8 9.8L12 2Z"
      fill="#F3D36B"
    />
  </svg>
);

export const WheatDividerSvg: React.FC<SvgProps> = ({ className = 'w-56 h-7' }) => (
  <svg viewBox="0 0 240 28" fill="none" className={className} aria-hidden="true">
    <path d="M12 14H98M142 14H228" stroke="#D4AF37" strokeOpacity="0.45" strokeWidth="1" strokeLinecap="round" />
    <path
      d="M120 5V23M113 14H127"
      stroke="#B68E23"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <ellipse cx="90" cy="10" rx="4" ry="2" transform="rotate(-25 90 10)" fill="#D4AF37" fillOpacity="0.65" />
    <ellipse cx="82" cy="18" rx="4" ry="2" transform="rotate(25 82 18)" fill="#D4AF37" fillOpacity="0.65" />
    <ellipse cx="150" cy="10" rx="4" ry="2" transform="rotate(25 150 10)" fill="#D4AF37" fillOpacity="0.65" />
    <ellipse cx="158" cy="18" rx="4" ry="2" transform="rotate(-25 158 18)" fill="#D4AF37" fillOpacity="0.65" />
  </svg>
);

export const MiniEnvelopeSvg: React.FC<SvgProps> = ({ className = 'w-12 h-9' }) => (
  <svg viewBox="0 0 64 46" fill="none" className={className} aria-hidden="true">
    {/* Envelope body */}
    <rect
      x="2"
      y="4"
      width="60"
      height="38"
      rx="6"
      fill="#FFFDF8"
      stroke="#D4AF37"
      strokeWidth="1.6"
    />
    {/* Flap fold */}
    <path
      d="M4 7L32 25L60 7"
      stroke="#D4AF37"
      strokeOpacity="0.7"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bottom diagonal folds */}
    <path
      d="M4 39L24 22M60 39L40 22"
      stroke="#CFE6F5"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Golden bow (moñito dorado) */}
    <path
      d="M32 23C27 18 22 20 23 24C24 27 29 26 32 23ZM32 23C37 18 42 20 41 24C40 27 35 26 32 23Z"
      fill="#F3D36B"
      stroke="#8A6A12"
      strokeWidth="1.1"
    />
    <circle cx="32" cy="23.5" r="2.2" fill="#D4AF37" stroke="#8A6A12" strokeWidth="0.9" />
  </svg>
);
