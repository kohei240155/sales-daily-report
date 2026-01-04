import React from 'react'

export default function SalesPage(): React.JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">営業マスタ</h1>
        <p className="text-muted-foreground">
          営業担当者情報を確認・管理できます（管理者のみ）
        </p>
      </div>
      <div className="rounded-lg border bg-card p-6">
        <p className="text-sm text-muted-foreground">
          営業マスタ機能は今後実装予定です
        </p>
      </div>
    </div>
  )
}
