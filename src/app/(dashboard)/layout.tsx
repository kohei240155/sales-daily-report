import React from 'react'

import { redirect } from 'next/navigation'

import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'
import { getCurrentUser } from '@/lib/auth/session'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<React.JSX.Element> {
  // 認証チェック
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  // JWTPayloadをHeaderとSidebarが期待する形式に変換
  const userInfo = {
    sales_name: user.email.split('@')[0] || 'Unknown', // TODO: 実際にはDBから取得すべき
    email: user.email,
    position: user.position,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header user={userInfo} />
      <div className="flex flex-1">
        <Sidebar user={{ position: user.position }} />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
