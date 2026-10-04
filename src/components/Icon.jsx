import { BookOpen, FileText, Gem, Landmark, ListOrdered, Radio, ScanSearch, Star, TrendingUp, Upload, Circle } from 'lucide-react'

// Name → component map, so config files (pages.js, adapters/feeds.js) can name
// icons as strings without importing React components.
const ICONS = { BookOpen, FileText, Gem, Landmark, ListOrdered, Radio, ScanSearch, Star, TrendingUp, Upload }

export default function Icon({ name, size = 16, ...rest }) {
  const Cmp = ICONS[name] || Circle
  return <Cmp size={size} strokeWidth={1.75} aria-hidden="true" {...rest} />
}
