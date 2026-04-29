interface ArrelLogoProps {
  size?: number
  className?: string
}

export default function ArrelLogo({ size = 22, className }: ArrelLogoProps) {
  // The logo is the word "arrel" rendered via SVG text with a descender line
  // below the final 'l' — a single stroke representing the root going underground.
  // At runtime we use the Lora font loaded via next/font.
  return (
    <svg
      width={size * 3.2}
      height={size * 1.6}
      viewBox="0 0 112 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ display: 'block' }}
    >
      {/* Wordmark text — Lora lowercase, matches the loaded font */}
      <text
        x="0"
        y="24"
        fontFamily="var(--font-lora), Georgia, serif"
        fontSize="24"
        fontWeight="700"
        fill="var(--terracotta)"
        letterSpacing="-0.5"
      >
        arrel
      </text>
      {/* The descender — a single vertical line below the final 'l'
          extending ~40% of cap height (≈9.6px) below baseline (y=24) */}
      <line
        x1="104"
        y1="25"
        x2="104"
        y2="35"
        stroke="var(--terracotta)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
