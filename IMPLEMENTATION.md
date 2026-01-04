# Issue#19: 共通レイアウトコンポーネント実装

## 実装内容

営業日報システムの共通レイアウトコンポーネントを実装しました。

## 作成したファイル

### 1. 認証ヘルパー関数
- **`src/lib/auth/session.ts`**
  - `getCurrentUser()`: 現在のログインユーザー情報を取得
  - `requireAuth()`: 認証チェック（未認証の場合は自動リダイレクト）
  - `isAdmin()`: 管理者権限チェック
  - `isManager()`: 上長権限チェック

### 2. レイアウトコンポーネント

#### Header (`src/components/layouts/Header.tsx`)
**特徴:**
- システム名「営業日報システム」を表示
- ナビゲーションメニュー（日報一覧、顧客マスタ、営業マスタ）
- 権限による表示制御（管理者のみ顧客マスタ・営業マスタを表示）
- ユーザー情報ドロップダウン（メールアドレス、部署、役職）
- ログアウト機能
- レスポンシブ対応（モバイルではハンバーガーメニュー）

**使用shadcn/uiコンポーネント:**
- Button
- DropdownMenu
- Avatar
- Sheet（モバイルメニュー）
- NavigationMenu

#### Sidebar (`src/components/layouts/Sidebar.tsx`)
**特徴:**
- アイコン付きサイドナビゲーション
- アクティブページのハイライト表示
- 権限による表示制御
- デスクトップのみ表示（モバイルでは非表示）

**使用アイコン（lucide-react）:**
- FileText（日報一覧）
- Users（顧客マスタ）
- UserCog（営業マスタ）

#### Footer (`src/components/layouts/Footer.tsx`)
**特徴:**
- シンプルなコピーライト表示
- 現在の年を自動取得

### 3. ダッシュボードレイアウト

#### DashboardLayout (`src/app/(dashboard)/layout.tsx`)
**特徴:**
- Server Component
- 認証チェック機能（自動リダイレクト）
- Header、Sidebar、Footerを組み合わせたレイアウト
- レスポンシブ対応（フレックスレイアウト）
- 子ページのコンテンツエリア

**レイアウト構造:**
```
┌─────────────────────────────┐
│         Header              │
├───────┬─────────────────────┤
│       │                     │
│ Side  │   Main Content      │
│ bar   │                     │
│       │                     │
├───────┴─────────────────────┤
│         Footer              │
└─────────────────────────────┘
```

### 4. プレースホルダーページ
- `src/app/(dashboard)/daily-reports/page.tsx` - 日報一覧ページ
- `src/app/(dashboard)/customers/page.tsx` - 顧客マスタページ（管理者のみ）
- `src/app/(dashboard)/sales/page.tsx` - 営業マスタページ（管理者のみ）

## 技術仕様

### Server Components vs Client Components

**Server Components（デフォルト）:**
- `DashboardLayout` - 認証チェックとデータ取得
- すべてのページコンポーネント

**Client Components（'use client'）:**
- `Header` - ユーザー操作（ログアウト、ドロップダウン、モバイルメニュー）
- `Sidebar` - ルーティング状態の監視（usePathname）

### 権限管理

**役職による権限分類:**
- **管理者**: `position === '部長'` または `position === '管理者'`
- **上長**: `position === '課長'` または `position === '部長'` または `position === '管理者'`
- **一般営業**: 上記以外

**アクセス制御:**
- 顧客マスタ: 管理者のみ
- 営業マスタ: 管理者のみ
- 日報一覧: 全員アクセス可能

### レスポンシブデザイン

**ブレークポイント:**
- モバイル（`< md`）: ハンバーガーメニュー、サイドバー非表示
- タブレット・デスクトップ（`≥ md`）: フルナビゲーション、サイドバー表示

**Tailwindブレークポイント:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 使用技術

### shadcn/uiコンポーネント
```bash
npx shadcn@latest add dropdown-menu avatar sheet navigation-menu
```

### 依存パッケージ
- `lucide-react` - アイコンライブラリ
- `next` - App Router
- `react` - UI フレームワーク
- `tailwindcss` - スタイリング
- `clsx` + `tailwind-merge` - クラス名結合（cn()ヘルパー）

## 今後の実装

1. **日報機能** (Issue#20)
   - 日報一覧コンポーネント
   - 日報作成・編集フォーム
   - 日報詳細表示

2. **顧客マスタ機能** (Issue#21)
   - 顧客一覧コンポーネント
   - 顧客登録・編集フォーム

3. **営業マスタ機能** (Issue#22)
   - 営業担当者一覧コンポーネント
   - 営業担当者登録・編集フォーム

4. **コメント機能** (Issue#23)
   - コメント一覧表示
   - コメント追加フォーム

## テスト方法

### 動作確認手順

1. **開発サーバー起動**
   ```bash
   pnpm dev
   ```

2. **ログイン**
   - `/login` ページからログイン
   - テストアカウントを使用

3. **レイアウト確認**
   - ヘッダーの表示確認
   - ナビゲーションメニューの動作確認
   - サイドバーの表示確認（デスクトップ）
   - モバイルメニューの動作確認
   - フッターの表示確認

4. **権限確認**
   - 管理者アカウント: すべてのメニューが表示される
   - 一般営業アカウント: 日報一覧のみ表示される

5. **レスポンシブ確認**
   - ブラウザの開発者ツールでデバイスをシミュレート
   - モバイル、タブレット、デスクトップで表示確認

### ESLint チェック
```bash
pnpm lint
```

### TypeScript 型チェック
```bash
pnpm type-check
```

## トラブルシューティング

### 認証エラー
- JWT_SECRETが環境変数に設定されているか確認
- トークンの有効期限を確認

### コンポーネントが表示されない
- shadcn/uiコンポーネントが正しくインストールされているか確認
- インポートパスが正しいか確認（`@/`エイリアス）

### スタイルが適用されない
- Tailwind CSSが正しく設定されているか確認
- `globals.css`がインポートされているか確認

## 参考資料

- [Next.js App Router ドキュメント](https://nextjs.org/docs/app)
- [shadcn/ui ドキュメント](https://ui.shadcn.com)
- [Tailwind CSS ドキュメント](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

## 改訂履歴

| 版数 | 改訂日     | 改訂者 | 改訂内容                     |
| ---- | ---------- | ------ | ---------------------------- |
| 1.0  | 2026/01/03 | -      | 初版作成（Issue#19 実装完了） |
