// src/app/(dashboard)/sales/page.tsx
import { requireAuth, isAdmin } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

export default async function SalesPage(): Promise<JSX.Element> {
  const user = await requireAuth()

  // 管理者権限チェック
  if (!isAdmin(user)) {
    redirect('/daily-reports')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">営業マスタ</h1>
        <p className="text-muted-foreground">
          営業担当者の一覧表示と管理を行います
        </p>
      </div>

      {/* TODO: 営業マスタコンポーネントを実装 */}
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        <p>営業マスタ機能は実装中です</p>
      </div>
    </div>
  )
}
