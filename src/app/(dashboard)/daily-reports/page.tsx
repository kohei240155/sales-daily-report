// src/app/(dashboard)/daily-reports/page.tsx
import { requireAuth } from '@/lib/auth/session'

export default async function DailyReportsPage(): Promise<JSX.Element> {
  const user = await requireAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">日報一覧</h1>
        <p className="text-muted-foreground">
          営業担当者の日報を一覧表示します
        </p>
      </div>

      {/* TODO: 日報一覧コンポーネントを実装 */}
      <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
        <p>日報一覧機能は実装中です</p>
        <p className="mt-2 text-sm">ログインユーザー: {user.email}</p>
      </div>
    </div>
  )
}
