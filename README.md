# 営業日報システム (Sales Daily Report System)

営業担当者の日々の営業活動を記録・共有し、上長がフィードバックを提供できるWebアプリケーション

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)

## 📋 目次

- [概要](#概要)
- [主要機能](#主要機能)
- [技術スタック](#技術スタック)
- [プロジェクト構成](#プロジェクト構成)
- [セットアップ](#セットアップ)
- [ドキュメント](#ドキュメント)
- [開発](#開発)
- [デプロイ](#デプロイ)
- [ライセンス](#ライセンス)

## 🎯 概要

営業日報システムは、営業担当者が日々の営業活動を効率的に記録し、上長との円滑なコミュニケーションを実現するためのWebアプリケーションです。

### 背景と目的

従来の紙やExcelベースの日報管理には以下の課題がありました：

- 検索性・共有性の低さ
- 営業活動履歴の分散
- フィードバックの遅延と記録の欠如

このシステムにより、以下を実現します：

- 日報作成時間の30%削減
- 営業活動の透明性向上
- ナレッジの蓄積と共有
- PDCAサイクルの高速化

## ✨ 主要機能

### 1. 日報管理

- ✅ 日報の作成・編集・削除
- ✅ 複数の訪問記録を1日報に紐付け
- ✅ 課題（Problem）と予定（Plan）の記録
- ✅ 日報の検索・フィルタリング

### 2. 訪問記録管理

- ✅ 顧客マスタからの訪問先選択
- ✅ 訪問時刻と訪問内容の記録
- ✅ 訪問履歴の可視化

### 3. コメント機能

- ✅ 上長による日報へのコメント
- ✅ コメント履歴の表示
- ✅ リアルタイムなフィードバック

### 4. マスタ管理

- ✅ 顧客マスタの管理（CRUD）
- ✅ 営業担当者マスタの管理（CRUD）
- ✅ 検索・フィルタリング機能

### 5. 権限管理

- ✅ ロールベースアクセス制御（RBAC）
  - 営業担当者：自分の日報のみ管理
  - 上長：部下の日報閲覧・コメント
  - 管理者：全機能へのアクセス

## 🛠 技術スタック

### フロントエンド

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form**: React Hook Form + Zod
- **State Management**: React Context API

### バックエンド

- **API**: Next.js API Routes
- **Language**: TypeScript
- **ORM**: Prisma
- **Authentication**: NextAuth.js (JWT)
- **Validation**: Zod

### データベース

- **Database**: PostgreSQL 15+
- **Migration**: Prisma Migrate

### 開発ツール

- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest + React Testing Library
- **Git Hooks**: Husky + lint-staged

## 📁 プロジェクト構成

```
sales-daily-report/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 認証ページ
│   │   ├── (dashboard)/       # ダッシュボード
│   │   └── api/               # API Routes
│   ├── components/            # Reactコンポーネント
│   │   ├── ui/               # UIコンポーネント
│   │   └── features/         # 機能別コンポーネント
│   ├── lib/                   # ユーティリティ
│   ├── types/                 # 型定義
│   └── hooks/                 # カスタムフック
├── prisma/
│   ├── schema.prisma         # Prismaスキーマ
│   ├── migrations/           # マイグレーション
│   └── seed.ts               # シードデータ
├── docs/                      # ドキュメント
│   ├── system_requirements.md
│   ├── er_diagram.md
│   ├── screen_definition.md
│   ├── api_specification.md
│   └── test_specification.md
├── CLAUDE.md                  # AI開発者向けドキュメント
└── README.md                  # このファイル
```

## 🚀 セットアップ

### 前提条件

- Node.js 18.0以上
- pnpm 8.0以上
- PostgreSQL 15以上

### インストール手順

1. **リポジトリのクローン**

```bash
git clone https://github.com/your-org/sales-daily-report.git
cd sales-daily-report
```

2. **依存関係のインストール**

```bash
pnpm install
```

3. **環境変数の設定**

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```env
DATABASE_URL="postgresql://user:password@localhost:5432/sales_report"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. **データベースのセットアップ**

```bash
# マイグレーション実行
pnpm prisma migrate dev

# シードデータ投入（開発用）
pnpm prisma db seed
```

5. **開発サーバー起動**

```bash
pnpm dev
```

http://localhost:3000 にアクセス

### デフォルトアカウント（開発環境）

| 役割   | メールアドレス   | パスワード |
| ------ | ---------------- | ---------- |
| 管理者 | admin@test.com   | Test1234!  |
| 上長   | manager@test.com | Test1234!  |
| 営業   | sales1@test.com  | Test1234!  |

## 📚 ドキュメント

詳細なドキュメントは`docs/`ディレクトリに格納されています：

### 設計書

- [**システム要件定義書**](./docs/system_requirements.md) - 機能要件・非機能要件の詳細
- [**ER図**](./docs/er_diagram.md) - データベース設計とエンティティ関連図
- [**画面定義書**](./docs/screen_definition.md) - 全画面の仕様と画面遷移
- [**API仕様書**](./docs/api_specification.md) - RESTful APIの詳細仕様
- [**テスト仕様書**](./docs/test_specification.md) - テストケースと実施手順

### 開発者向け

- [**CLAUDE.md**](./CLAUDE.md) - AI開発者向けの実装ガイド

## 🔧 開発

### スクリプト

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# 本番サーバー起動
pnpm start

# リント
pnpm lint

# 型チェック
pnpm type-check

# テスト実行
pnpm test

# テスト（ウォッチモード）
pnpm test:watch

# Prisma Studio起動
pnpm prisma studio
```

### コーディング規約

- TypeScriptの厳格モードを使用
- `any`型の使用禁止
- Server Componentsを優先的に使用
- コンポーネント名：PascalCase
- ファイル名：kebab-case
- 詳細は[CLAUDE.md](./CLAUDE.md)を参照

### Git ワークフロー

```bash
# 機能開発
git checkout -b feature/your-feature-name

# コミット
git add .
git commit -m "feat: add new feature"

# プッシュ
git push origin feature/your-feature-name
```

#### コミットメッセージ規約（Conventional Commits）

- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードスタイル変更
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: ビルドプロセスやツール変更

## 🌐 デプロイ

### Vercelへのデプロイ

1. **Vercel CLIのインストール**

```bash
npm i -g vercel
```

2. **デプロイ**

```bash
# プレビュー環境
vercel

# 本番環境
vercel --prod
```

3. **環境変数の設定**

Vercelダッシュボードで以下を設定：

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### その他のホスティング

- **AWS**: Amplify / EC2 + RDS
- **GCP**: Cloud Run + Cloud SQL
- **Azure**: App Service + PostgreSQL

詳細は各プラットフォームのドキュメントを参照してください。

## 🧪 テスト

### テストの実行

```bash
# 全テスト実行
pnpm test

# カバレッジ付き
pnpm test:coverage

# 特定ファイルのテスト
pnpm test path/to/test
```

### テスト構成

- **単体テスト**: ユーティリティ関数、フック
- **結合テスト**: APIルート
- **E2Eテスト**: Playwright（オプション）

## 📊 データベース

### ER図概要

```
Sales (営業担当者)
  ├── DailyReport (日報) [1:N]
  │    ├── VisitRecord (訪問記録) [1:N]
  │    │    └── Customer (顧客) [N:1]
  │    └── Comment (コメント) [1:N]
  └── Comment (コメント) [1:N]
```

詳細は[ER図ドキュメント](./docs/er_diagram.md)を参照

### マイグレーション

```bash
# マイグレーション作成
pnpm prisma migrate dev --name migration-name

# マイグレーション適用
pnpm prisma migrate deploy

# データベースリセット（開発環境のみ）
pnpm prisma migrate reset
```

## 🔒 セキュリティ

- JWT認証
- bcryptによるパスワードハッシュ化
- HTTPS通信の強制
- SQLインジェクション対策（Prisma ORM）
- XSS対策（React自動エスケープ）
- CSRF対策（NextAuth.js）

セキュリティ上の問題を発見した場合は、イシューではなく直接連絡してください。

## 🤝 コントリビューション

コントリビューションを歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

詳細は[CONTRIBUTING.md](./CONTRIBUTING.md)を参照

## 📝 今後の予定（ロードマップ）

### Phase 2

- [ ] 承認ワークフロー
- [ ] レポート・分析機能
- [ ] ダッシュボード強化
- [ ] 通知機能（メール・プッシュ）

### Phase 3

- [ ] モバイルアプリ（React Native）
- [ ] オフライン対応
- [ ] 外部システム連携（SFA/CRM）
- [ ] AI活用（訪問内容の自動要約）

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](./LICENSE)ファイルを参照してください。

## 👥 開発チーム

- **プロジェクトオーナー**: Your Name
- **リードエンジニア**: Your Name

## 📞 サポート

質問や問題がある場合：

- イシューを作成: [GitHub Issues](https://github.com/your-org/sales-daily-report/issues)
- メール: support@example.com
- Slack: #sales-report-support

## 🙏 謝辞

このプロジェクトは以下のオープンソースプロジェクトを使用しています：

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- その他多数の素晴らしいライブラリ

---

**注意**: このREADMEは開発の進捗に応じて更新されます。最新情報は常にこのファイルを参照してください。

---

Made with ❤️ by Your Team
