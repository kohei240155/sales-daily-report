# 営業日報システム (Sales Daily Report System)

## プロジェクト概要

営業担当者が日々の営業活動を報告し、上長が確認・フィードバックできる日報管理システム。
訪問記録の管理、課題・予定の共有、上長からのコメント機能を提供。

## ドキュメント

プロジェクトの詳細なドキュメントは以下を参照してください：

- **システム要件定義**: @docs/system_requirements.md
- **ER図**: @docs/er_diagram.md
- **画面定義書**: @docs/screen_definition.md
- **API仕様書**: @docs/api_specification.md
- **テスト仕様書**: @docs/test_specification.md

## 技術スタック

### フロントエンド

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **UI Library**: React 18+
- **Styling**: Tailwind CSS 3+
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form + Zod
- **State Management**: React Context / Zustand
- **API Client**: Axios / Fetch API
- **Date Handling**: date-fns

### バックエンド

- **Framework**: Next.js API Routes
- **Language**: TypeScript 5+
- **ORM**: Prisma
- **API Schema**: OpenAPI 3.0 (Zod Integration)
- **Authentication**: NextAuth.js (JWT)
- **Validation**: Zod

### データベース

- **Database**: PostgreSQL 15+
- **Migration**: Prisma Migrate

### 開発ツール

- **Package Manager**: pnpm
- **Linter**: ESLint
- **Formatter**: Prettier
- **Git Hooks**: Husky + lint-staged
- **Testing**: Vitest + React Testing Library

### インフラ

- **Container**: Docker
- **Hosting**: Google Cloud Run
- **CI/CD**: GitHub Actions
- **Database Hosting**: Cloud SQL (PostgreSQL)

## ディレクトリ構造

```
sales-daily-report/
├── docs/                          # ドキュメント
│   ├── system_requirements.md     # システム要件定義
│   ├── er_diagram.md              # ER図
│   ├── screen_definition.md       # 画面定義書
│   ├── api_specification.md       # API仕様書（OpenAPI）
│   └── test_specification.md      # テスト仕様書
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── (auth)/                # 認証関連ページ
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/           # ダッシュボード（認証後）
│   │   │   ├── layout.tsx
│   │   │   ├── daily-reports/    # 日報関連
│   │   │   │   ├── page.tsx      # 日報一覧
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx  # 日報作成
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx  # 日報詳細
│   │   │   │       └── edit/
│   │   │   │           └── page.tsx  # 日報編集
│   │   │   ├── customers/         # 顧客マスタ
│   │   │   │   ├── page.tsx
│   │   │   │   ├── new/
│   │   │   │   └── [id]/
│   │   │   └── sales/             # 営業マスタ（管理者のみ）
│   │   │       ├── page.tsx
│   │   │       ├── new/
│   │   │       └── [id]/
│   │   ├── api/                   # API Routes
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── logout/
│   │   │   │   └── refresh/
│   │   │   ├── daily-reports/
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   ├── visit-records/
│   │   │   ├── comments/
│   │   │   ├── customers/
│   │   │   └── sales/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/                # Reactコンポーネント
│   │   ├── ui/                    # shadcn/ui コンポーネント
│   │   ├── layouts/               # レイアウトコンポーネント
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── daily-reports/         # 日報関連コンポーネント
│   │   │   ├── DailyReportForm.tsx
│   │   │   ├── DailyReportList.tsx
│   │   │   ├── DailyReportDetail.tsx
│   │   │   └── VisitRecordForm.tsx
│   │   ├── comments/              # コメント関連
│   │   │   ├── CommentList.tsx
│   │   │   └── CommentForm.tsx
│   │   ├── customers/             # 顧客関連
│   │   │   ├── CustomerForm.tsx
│   │   │   └── CustomerList.tsx
│   │   └── common/                # 共通コンポーネント
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorMessage.tsx
│   │       └── Pagination.tsx
│   ├── lib/                       # ユーティリティ
│   │   ├── db/                    # データベース
│   │   │   ├── prisma.ts          # Prisma Client
│   │   │   └── schema.prisma      # Prismaスキーマ
│   │   ├── auth/                  # 認証関連
│   │   │   ├── jwt.ts
│   │   │   └── middleware.ts
│   │   ├── api/                   # APIクライアント
│   │   │   ├── client.ts
│   │   │   └── openapi.ts         # OpenAPI定義
│   │   ├── validations/           # バリデーションスキーマ（Zod）
│   │   │   ├── daily-report.ts
│   │   │   ├── customer.ts
│   │   │   └── sales.ts
│   │   └── utils/                 # ヘルパー関数
│   │       ├── format.ts
│   │       └── date.ts
│   ├── types/                     # TypeScript型定義
│   │   ├── daily-report.ts
│   │   ├── customer.ts
│   │   ├── sales.ts
│   │   └── api.ts
│   ├── hooks/                     # カスタムフック
│   │   ├── useDailyReports.ts
│   │   ├── useAuth.ts
│   │   └── useCustomers.ts
│   └── styles/                    # グローバルスタイル
│       └── globals.css
├── prisma/                        # Prisma設定
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── openapi/                       # OpenAPI仕様
│   ├── openapi.yaml              # OpenAPI定義ファイル
│   └── schemas/                  # スキーマ定義
│       ├── daily-report.yaml
│       ├── customer.yaml
│       └── sales.yaml
├── public/                        # 静的ファイル
├── tests/                         # テストファイル
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example                   # 環境変数サンプル
├── .env.local                     # 環境変数（ローカル）
├── .eslintrc.json
├── .prettierrc
├── .github/
│   └── workflows/
│       ├── ci.yml                # CI/CD設定
│       └── deploy.yml            # Cloud Runデプロイ設定
├── CLAUDE.MD                      # このファイル
├── cloudbuild.yaml               # Cloud Build設定
├── docker-compose.yml
├── Dockerfile                     # Cloud Run用Dockerfile
├── next.config.js
├── package.json
├── tsconfig.json
├── vitest.config.ts              # Vitestテスト設定
└── README.md
```

## セットアップ手順

### 1. 前提条件

- Node.js 20.x以上
- PostgreSQL 15以上
- pnpm
- Docker（任意）
- Google Cloud SDK（デプロイ時）

### 2. リポジトリのクローン

```bash
git clone https://github.com/your-org/sales-daily-report.git
cd sales-daily-report
```

### 3. 依存関係のインストール

```bash
pnpm install
```

### 4. 環境変数の設定

```bash
cp .env.example .env.local
```

`.env.local`を編集：

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/sales_daily_report"

# JWT
JWT_SECRET="your-secret-key-here"
JWT_EXPIRES_IN="24h"

# Next.js
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Google Cloud (本番環境)
GOOGLE_CLOUD_PROJECT="your-project-id"
GOOGLE_CLOUD_SQL_CONNECTION_NAME="project:region:instance"
```

### 5. データベースのセットアップ

```bash
# Prismaマイグレーション実行
pnpm prisma migrate dev

# シードデータの投入（任意）
pnpm prisma db seed
```

### 6. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3000` を開く

## 開発ガイドライン

### コーディング規約

#### TypeScript

- `any`型の使用禁止（やむを得ない場合は`unknown`を使用）
- すべての関数に明示的な戻り値の型を定義
- インターフェースは`I`プレフィックスを付けない（例: `User`、`UserProps`）
- `enum`の代わりに`as const`を使用

```typescript
// ❌ Bad
const UserRole = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES: 'sales',
}

// ✅ Good
const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SALES: 'sales',
} as const

type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]
```

#### React/Next.js

- Server Componentsをデフォルトとする
- Client Componentsは必要最小限に（`'use client'`を明示）
- コンポーネント名はPascalCase（例: `DailyReportForm.tsx`）
- カスタムフックは`use`プレフィックス（例: `useDailyReports.ts`）

```typescript
// ✅ Server Component（デフォルト）
export default async function DailyReportsPage() {
  const reports = await fetchReports()
  return <DailyReportList reports={reports} />
}

// ✅ Client Component（必要な場合のみ）
'use client'

export function DailyReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  // ...
}
```

#### CSS/Tailwind

- Tailwind CSSのユーティリティクラスを優先
- カスタムCSSは最小限に
- `cn()`ヘルパーを使用してクラス名を結合

```typescript
import { cn } from '@/lib/utils'

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md bg-blue-500 text-white",
        className
      )}
      {...props}
    />
  )
}
```

### ファイル命名規則

- コンポーネント: PascalCase（例: `DailyReportForm.tsx`）
- ユーティリティ: kebab-case（例: `format-date.ts`）
- API Routes: kebab-case（例: `daily-reports/route.ts`）
- 型定義: kebab-case（例: `daily-report.ts`）

### Git運用

#### ブランチ戦略

- `main`: 本番環境
- `develop`: 開発環境
- `feature/*`: 機能開発
- `bugfix/*`: バグ修正
- `hotfix/*`: 緊急修正

#### コミットメッセージ

Conventional Commitsに従う：

```
feat: 日報作成機能を追加
fix: 日報一覧の検索バグを修正
docs: API仕様書を更新
style: コードフォーマットを修正
refactor: 認証ロジックをリファクタリング
test: 日報作成のテストを追加
chore: 依存関係を更新
```

## 重要な実装ルール

### OpenAPI仕様の管理

#### OpenAPI定義とZodの統合

```typescript
// lib/validations/daily-report.ts
import { z } from 'zod'

// Zodスキーマ（バリデーション用）
export const createDailyReportSchema = z.object({
  report_date: z.string().date(),
  problem: z.string().max(2000).optional(),
  plan: z.string().max(2000).optional(),
  visit_records: z
    .array(
      z.object({
        customer_id: z.number(),
        visit_time: z.string().optional(),
        visit_content: z.string().max(1000),
      })
    )
    .min(1),
})

// OpenAPI用の型定義（同じスキーマから生成）
export type CreateDailyReportRequest = z.infer<typeof createDailyReportSchema>
```

```yaml
# openapi/schemas/daily-report.yaml
CreateDailyReportRequest:
  type: object
  required:
    - report_date
    - visit_records
  properties:
    report_date:
      type: string
      format: date
      description: 日報日付
    problem:
      type: string
      maxLength: 2000
      description: 本日の課題
    plan:
      type: string
      maxLength: 2000
      description: 明日の予定
    visit_records:
      type: array
      minItems: 1
      items:
        $ref: '#/components/schemas/VisitRecordInput'
```

#### API RouteでのOpenAPI準拠

```typescript
// app/api/daily-reports/route.ts
import { NextResponse } from 'next/server'
import { createDailyReportSchema } from '@/lib/validations/daily-report'

/**
 * @openapi
 * /api/daily-reports:
 *   post:
 *     summary: 日報を作成
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDailyReportRequest'
 *     responses:
 *       201:
 *         description: 作成成功
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DailyReportResponse'
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validated = createDailyReportSchema.parse(body)

    // ... 処理

    return NextResponse.json(
      {
        status: 'success',
        data: result,
      },
      { status: 201 }
    )
  } catch (error) {
    // エラーハンドリング
  }
}
```

### 認証・認可

#### JWT認証の実装

```typescript
// lib/auth/jwt.ts
import { SignJWT, jwtVerify } from 'jose'

export async function signToken(payload: JWTPayload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(secret)
}

export async function verifyToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)
  const { payload } = await jwtVerify(token, secret)
  return payload
}
```

#### ミドルウェアでの認証チェック

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth/jwt'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await verifyToken(token)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/daily-reports/:path*', '/customers/:path*', '/sales/:path*'],
}
```

### データ取得とバリデーション

#### Server Actionsの使用

```typescript
// app/actions/daily-reports.ts
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/db/prisma'
import { createDailyReportSchema } from '@/lib/validations/daily-report'

export async function createDailyReport(data: unknown) {
  const validated = createDailyReportSchema.parse(data)

  const report = await prisma.dailyReport.create({
    data: {
      ...validated,
      visit_records: {
        create: validated.visit_records,
      },
    },
  })

  revalidatePath('/daily-reports')
  return report
}
```

### エラーハンドリング

#### APIエラーレスポンス（OpenAPI準拠）

```typescript
// app/api/daily-reports/route.ts
import { NextResponse } from 'next/server'
import { ZodError } from 'zod'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // ... 処理

    return NextResponse.json({
      status: 'success',
      data: result,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          error: {
            code: 'VALID_001',
            message: 'バリデーションエラー',
            details: error.errors,
          },
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        status: 'error',
        error: {
          code: 'SYS_001',
          message: 'サーバーエラーが発生しました',
        },
      },
      { status: 500 }
    )
  }
}
```

### データベース操作

#### Prismaスキーマ例

```prisma
// prisma/schema.prisma
model Sales {
  id         Int      @id @default(autoincrement()) @map("sales_id")
  name       String   @map("sales_name") @db.VarChar(100)
  email      String   @unique @db.VarChar(255)
  password   String   @db.VarChar(255)
  department String   @db.VarChar(100)
  position   String   @db.VarChar(50)
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  dailyReports DailyReport[]
  comments     Comment[]

  @@map("sales")
}

model DailyReport {
  id         Int      @id @default(autoincrement()) @map("report_id")
  salesId    Int      @map("sales_id")
  reportDate DateTime @map("report_date") @db.Date
  problem    String?  @db.Text
  plan       String?  @db.Text
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  sales        Sales          @relation(fields: [salesId], references: [id])
  visitRecords VisitRecord[]
  comments     Comment[]

  @@unique([salesId, reportDate])
  @@map("daily_reports")
}
```

#### トランザクション処理

```typescript
// 日報と訪問記録を同時に作成
const report = await prisma.$transaction(async (tx) => {
  const dailyReport = await tx.dailyReport.create({
    data: {
      salesId: userId,
      reportDate: new Date(),
      problem: data.problem,
      plan: data.plan,
    },
  })

  await tx.visitRecord.createMany({
    data: data.visitRecords.map((record) => ({
      reportId: dailyReport.id,
      customerId: record.customer_id,
      visitTime: record.visit_time,
      visitContent: record.visit_content,
    })),
  })

  return dailyReport
})
```

### パフォーマンス最適化

#### Server Components での並列データ取得

```typescript
export default async function DailyReportDetailPage({ params }: Props) {
  // 並列で取得
  const [report, comments, visitRecords] = await Promise.all([
    fetchDailyReport(params.id),
    fetchComments(params.id),
    fetchVisitRecords(params.id)
  ])

  return (
    <div>
      <DailyReportDetail report={report} />
      <VisitRecordList records={visitRecords} />
      <CommentList comments={comments} />
    </div>
  )
}
```

#### 動的インポート

```typescript
// 重いコンポーネントは動的インポート
import dynamic from 'next/dynamic'

const ChartComponent = dynamic(
  () => import('@/components/charts/SalesChart'),
  { ssr: false, loading: () => <LoadingSpinner /> }
)
```

## テスト

### Vitestの設定

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### テスト実行

```bash
# 単体テスト
pnpm test

# ウォッチモード
pnpm test:watch

# カバレッジ
pnpm test:coverage

# E2Eテスト
pnpm test:e2e
```

### テスト例

```typescript
// tests/unit/components/DailyReportForm.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DailyReportForm } from '@/components/daily-reports/DailyReportForm'

describe('DailyReportForm', () => {
  it('should render form fields', () => {
    render(<DailyReportForm />)

    expect(screen.getByLabelText('日報日付')).toBeInTheDocument()
    expect(screen.getByLabelText('本日の課題')).toBeInTheDocument()
    expect(screen.getByLabelText('明日の予定')).toBeInTheDocument()
  })

  it('should validate required fields', async () => {
    const onSubmit = vi.fn()
    render(<DailyReportForm onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: '登録' })
    fireEvent.click(submitButton)

    expect(onSubmit).not.toHaveBeenCalled()
    expect(screen.getByText('訪問記録は1件以上必要です')).toBeInTheDocument()
  })
})
```

## ビルド・デプロイ

### ローカルビルド

```bash
# 本番ビルド
pnpm build

# 本番環境で起動
pnpm start
```

### Docker

```bash
# ビルド
docker build -t sales-daily-report .

# ローカル実行
docker run -p 3000:3000 sales-daily-report

# Docker Compose
docker-compose up -d
```

### Google Cloud Runへのデプロイ

#### Dockerfileの設定

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# 依存関係のインストール
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# ビルド
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN corepack enable pnpm && pnpm build

# 本番イメージ
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Cloud Buildの設定

```yaml
# cloudbuild.yaml
steps:
  # Dockerイメージのビルド
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/sales-daily-report:$COMMIT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/sales-daily-report:latest'
      - '.'

  # Container Registryにプッシュ
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'push'
      - 'gcr.io/$PROJECT_ID/sales-daily-report:$COMMIT_SHA'

  # Cloud Runにデプロイ
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'sales-daily-report'
      - '--image'
      - 'gcr.io/$PROJECT_ID/sales-daily-report:$COMMIT_SHA'
      - '--region'
      - 'asia-northeast1'
      - '--platform'
      - 'managed'
      - '--allow-unauthenticated'
      - '--set-env-vars'
      - 'DATABASE_URL=$$DATABASE_URL,JWT_SECRET=$$JWT_SECRET'
      - '--set-cloudsql-instances'
      - '$PROJECT_ID:asia-northeast1:sales-db'

images:
  - 'gcr.io/$PROJECT_ID/sales-daily-report:$COMMIT_SHA'
  - 'gcr.io/$PROJECT_ID/sales-daily-report:latest'

timeout: 1200s
```

#### GitHub Actionsでの自動デプロイ

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloud Run

on:
  push:
    branches:
      - main

env:
  PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}
  REGION: asia-northeast1
  SERVICE_NAME: sales-daily-report

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Cloud SDK
        uses: google-github-actions/setup-gcloud@v1
        with:
          service_account_key: ${{ secrets.GCP_SA_KEY }}
          project_id: ${{ secrets.GCP_PROJECT_ID }}

      - name: Configure Docker
        run: gcloud auth configure-docker

      - name: Build and Push Docker image
        run: |
          docker build -t gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA .
          docker push gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy $SERVICE_NAME \
            --image gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA \
            --region $REGION \
            --platform managed \
            --allow-unauthenticated \
            --set-env-vars DATABASE_URL=${{ secrets.DATABASE_URL }},JWT_SECRET=${{ secrets.JWT_SECRET }} \
            --set-cloudsql-instances ${{ secrets.CLOUD_SQL_CONNECTION_NAME }}
```

#### デプロイコマンド

```bash
# Cloud Buildを使用したデプロイ
gcloud builds submit --config cloudbuild.yaml

# 直接デプロイ
gcloud run deploy sales-daily-report \
  --source . \
  --region asia-northeast1 \
  --platform managed \
  --allow-unauthenticated
```

## トラブルシューティング

### Prismaの型が更新されない

```bash
pnpm prisma generate
```

### データベースのリセット

```bash
pnpm prisma migrate reset
```

### Next.jsのキャッシュクリア

```bash
rm -rf .next
pnpm dev
```

### Cloud Runのログ確認

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=sales-daily-report" --limit 50
```

### Cloud SQLへの接続テスト

```bash
gcloud sql connect sales-db --user=postgres
```

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Zod Documentation](https://zod.dev)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Vitest Documentation](https://vitest.dev/)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)

## ライセンス

MIT

## 改訂履歴

| 版数 | 改訂日     | 改訂者 | 改訂内容                                    |
| ---- | ---------- | ------ | ------------------------------------------- |
| 1.0  | 2026/01/02 | -      | 初版作成                                    |
| 1.1  | 2026/01/03 | -      | OpenAPI、Vitest、Google Cloud Run対応に更新 |
