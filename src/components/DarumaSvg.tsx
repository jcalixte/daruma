interface DarumaSvgProps {
  color: string
  hasFirstEye?: boolean
  hasSecondEye?: boolean
  className?: string
}

const colorMap: Record<string, string> = {
  red: "#FFB3B3",
  blue: "#B3D9FF",
  green: "#B3FFB3",
  gold: "#FFE5B3",
  purple: "#E5B3FF",
} as const

export function DarumaSvg({
  color,
  hasFirstEye,
  hasSecondEye,
  className = "",
}: DarumaSvgProps) {
  const baseColor = colorMap[color] || colorMap.red

  return (
    <svg
      viewBox="0 0 200 220"
      className={`w-24 h-24 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base */}
      <path
        d="M190 140c0 44.183-35.817 80-80 80s-80-35.817-80-80c0-44.183 35.817-90 80-90s80 45.817 80 90z"
        fill={baseColor}
        stroke="#000"
        strokeWidth="2"
      />

      {/* Shadow overlay */}
      <path
        d="M185 140c0 41.421-33.579 75-75 75s-75-33.579-75-75c0-41.421 33.579-85 75-85s75 43.579 75 85z"
        fill="rgba(0,0,0,0.1)"
      />

      {/* Eyebrows */}
      <path
        d="M60 90c10-5 20-5 30 0M110 90c10-5 20-5 30 0"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Eyes */}
      {hasFirstEye && <circle cx="75" cy="100" r="8" fill="#000" />}
      {hasSecondEye && <circle cx="125" cy="100" r="8" fill="#000" />}
      {!hasFirstEye && (
        <circle
          cx="75"
          cy="100"
          r="8"
          fill="none"
          stroke="#000"
          strokeWidth="2"
        />
      )}
      {!hasSecondEye && (
        <circle
          cx="125"
          cy="100"
          r="8"
          fill="none"
          stroke="#000"
          strokeWidth="2"
        />
      )}

      {/* Mustache */}
      <path
        d="M85 130c10 5 20 5 30 0"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Blush marks */}
      <circle cx="60" cy="115" r="8" fill="rgba(255,0,0,0.2)" />
      <circle cx="140" cy="115" r="8" fill="rgba(255,0,0,0.2)" />
    </svg>
  )
}
