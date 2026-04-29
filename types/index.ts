export type Segment = 'follow-the-build' | 'technical-specs' | 'finca-planning' | null

export interface BuildEntry {
  title: string
  date: string
  phase: number
  slug: string
  excerpt: string
  thumbnail?: string
}

export interface SystemMetrics {
  ph: number | null
  eggsThisWeek: number | null
  cisternLitres: number | null
  lastUpdated: string | null
  isPlaceholder: boolean
}
