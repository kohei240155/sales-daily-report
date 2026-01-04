'use client'

import React, { type FC } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ChevronRight, FileText, UserCircle, Users } from 'lucide-react'

import { cn } from '@/lib/utils'

interface SidebarProps {
  user?: {
    position: string
  }
  className?: string
}

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  requireAdmin: boolean
}

export const Sidebar: FC<SidebarProps> = ({ user, className }) => {
  const pathname = usePathname()
  const isAdmin = user?.position === '管理者' || user?.position === '部長'

  const navItems: NavItem[] = [
    {
      href: '/daily-reports',
      label: '日報一覧',
      icon: FileText,
      requireAdmin: false,
    },
    {
      href: '/customers',
      label: '顧客マスタ',
      icon: Users,
      requireAdmin: false,
    },
    {
      href: '/sales',
      label: '営業マスタ',
      icon: UserCircle,
      requireAdmin: true,
    },
  ]

  return (
    <aside
      className={cn(
        'hidden md:flex w-64 flex-col border-r bg-background',
        className
      )}
    >
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            if (item.requireAdmin && !isAdmin) return null

            const isActive = pathname.startsWith(item.href)
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground',
                  isActive
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
