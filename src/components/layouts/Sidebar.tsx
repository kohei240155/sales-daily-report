// src/components/layouts/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, Users, UserCog } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isAdmin: boolean
}

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  adminOnly?: boolean
}

const navItems: NavItem[] = [
  {
    href: '/daily-reports',
    label: '日報一覧',
    icon: FileText,
  },
  {
    href: '/customers',
    label: '顧客マスタ',
    icon: Users,
    adminOnly: true,
  },
  {
    href: '/sales',
    label: '営業マスタ',
    icon: UserCog,
    adminOnly: true,
  },
]

export function Sidebar({ isAdmin }: SidebarProps): JSX.Element {
  const pathname = usePathname()

  // フィルタリング: 管理者権限が必要なアイテムをチェック
  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || isAdmin
  )

  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <nav className="space-y-1 p-4">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
