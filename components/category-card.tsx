import Link from "next/link"
import { Film, Tv, Trophy, BookOpen, type LucideIcon } from "lucide-react"

interface CategoryCardProps {
  title: string
  count: number
  icon: string
  color: string
  textColor: string
  href: string
}

export default function CategoryCard({ title, count, icon, color, textColor, href }: CategoryCardProps) {
  const IconComponent = getIconComponent(icon)

  return (
    <Link href={href}>
      <div
        className={`rounded-xl p-6 ${color} transition-all hover:shadow-md hover:bg-gray-700 cursor-pointer border border-gray-700`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-full ${textColor} bg-gray-900/50`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="text-gray-400 text-sm font-medium">{count} sites</span>
        </div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
        <p className="text-gray-400 mt-1 text-sm">Browse {count} free streaming sites</p>
      </div>
    </Link>
  )
}

function getIconComponent(icon: string): LucideIcon {
  switch (icon.toLowerCase()) {
    case "film":
      return Film
    case "tv":
      return Tv
    case "trophy":
      return Trophy
    case "book-open":
      return BookOpen
    default:
      return Film
  }
}
