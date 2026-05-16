import Image from 'next/image'

interface ArrelLogoProps {
  size?: number
  className?: string
}

export default function ArrelLogo({ size = 22, className }: ArrelLogoProps) {
  // Calculated dimensions based on your original SVG ratio (approx 3:1)
  const width = size * 3.2
  const height = size * 1.6

  return (
    <div 
      className={className} 
      style={{ width: `${width}px`, height: `${height}px`, position: 'relative' }}
    >
      <Image
        src="/og/default.png" // Path relative to the 'public' folder
        alt="Arrel Logo"
        fill // This makes it fill the parent div
        style={{ objectFit: 'contain' }}
        priority // Ensures the logo loads immediately (important for headers)
      />
    </div>
  )
}
