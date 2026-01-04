// src/app/(dashboard)/customers/page.tsx
import { requireAuth, isAdmin } from '@/lib/auth/session'
import { redirect } from 'next/navigation'

export default async function CustomersPage(): Promise<JSX.Element> {
  const user = await requireAuth()

  // 管理者権限チェック
  if (!isAdmin(user)) {
    redirect('/daily-reports')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">顧客マスタ</h1>
        <p className="text-muted-foreground">
          顧客情報の一覧表示と管理を行います
        </p>
      </div>

      {/* TODO: 顧客マスタコンポーネントを実装 */}
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        <p>顧客マスタ機能は実装中です</p>
      </div>
    </div>
  )
}
