export default function Home(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-4">営業日報システム</h1>
        <p className="text-xl">
          営業担当者が日々の営業活動を報告し、上長が確認・フィードバックできる日報管理システム
        </p>
      </div>
    </main>
  )
}
