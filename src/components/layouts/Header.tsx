'use client'

import React, { type FC } from 'react'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { LogOut, Menu } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface HeaderProps {
  user?: {
    sales_name: string
    email: string
    position: string
  }
}

export const Header: FC<HeaderProps> = ({ user }) => {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async (): Promise<void> => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('ログアウトエラー:', error)
    }
  }

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const navigationItems = [
    { href: '/daily-reports', label: '日報一覧', requireAdmin: false },
    { href: '/customers', label: '顧客マスタ', requireAdmin: false },
    { href: '/sales', label: '営業マスタ', requireAdmin: true },
  ]

  const isAdmin = user?.position === '管理者' || user?.position === '部長'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* システム名 */}
        <div className="mr-8 flex items-center">
          <Link href="/daily-reports" className="flex items-center space-x-2">
            <span className="text-xl font-bold">営業日報システム</span>
          </Link>
        </div>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
          {navigationItems.map((item) => {
            if (item.requireAdmin && !isAdmin) return null
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-foreground/80 ${
                  pathname.startsWith(item.href)
                    ? 'text-foreground'
                    : 'text-foreground/60'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* ユーザーメニュー */}
        <div className="flex items-center space-x-4">
          {user && (
            <>
              {/* デスクトップユーザーメニュー */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex relative h-10 w-10 rounded-full"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getInitials(user.sales_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.sales_name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.position}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>ログアウト</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* モバイルメニュー */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="メニューを開く"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 pb-4 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {getInitials(user.sales_name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.sales_name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.position}
                        </p>
                      </div>
                    </div>
                    {navigationItems.map((item) => {
                      if (item.requireAdmin && !isAdmin) return null
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`text-sm font-medium transition-colors hover:text-foreground/80 ${
                            pathname.startsWith(item.href)
                              ? 'text-foreground'
                              : 'text-foreground/60'
                          }`}
                        >
                          {item.label}
                        </Link>
                      )
                    })}
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      ログアウト
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
