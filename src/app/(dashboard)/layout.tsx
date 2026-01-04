// src/app/(dashboard)/layout.tsx
import { requireAuth, isAdmin } from '@/lib/auth/session'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'
import { Footer } from '@/components/layouts/Footer'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps): Promise<JSX.Element> {
  // 認証チェック - 未認証の場合は自動的にログインページへリダイレクト
  const user = await requireAuth()

  // 管理者権限チェック
  const adminFlag = isAdmin(user)

  return (
    <div className="flex min-h-screen flex-col">
      {/* ヘッダー */}
      <Header user={user} isAdmin={adminFlag} />

      {/* メインコンテンツ */}
      <div className="flex flex-1">
        {/* サイドバー（デスクトップのみ） */}
        <Sidebar isAdmin={adminFlag} />

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6">{children}</div>
        </main>
      </div>

      {/* フッター */}
      <Footer />
    </div>
  )
}
