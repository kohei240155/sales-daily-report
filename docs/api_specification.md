# 営業日報システム API仕様書

## 目次

1. [概要](#概要)
2. [共通仕様](#共通仕様)
3. [認証API](#認証api)
4. [日報API](#日報api)
5. [訪問記録API](#訪問記録api)
6. [コメントAPI](#コメントapi)
7. [顧客マスタAPI](#顧客マスタapi)
8. [営業マスタAPI](#営業マスタapi)
9. [エラーコード](#エラーコード)

---

## 概要

### ベースURL

```
https://api.example.com/v1
```

### プロトコル

HTTPS

### データフォーマット

- リクエスト：JSON
- レスポンス：JSON

---

## 共通仕様

### リクエストヘッダー

| ヘッダー名    | 値               | 必須 | 備考                 |
| ------------- | ---------------- | ---- | -------------------- |
| Content-Type  | application/json | ○    | POST/PUT/PATCHの場合 |
| Authorization | Bearer {token}   | ○    | ログインAPI以外      |

### 認証方式

JWT（JSON Web Token）を使用

### レスポンスの共通フォーマット

#### 成功時

```json
{
  "status": "success",
  "data": {
    // レスポンスデータ
  }
}
```

#### エラー時

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ",
    "details": [
      {
        "field": "フィールド名",
        "message": "詳細メッセージ"
      }
    ]
  }
}
```

### ページネーション

リスト取得APIで使用

#### リクエストパラメータ

| パラメータ名 | 型      | デフォルト | 説明                           |
| ------------ | ------- | ---------- | ------------------------------ |
| page         | integer | 1          | ページ番号                     |
| per_page     | integer | 20         | 1ページあたりの件数（最大100） |

#### レスポンス形式

```json
{
  "status": "success",
  "data": {
    "items": [],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_count": 100,
      "total_pages": 5
    }
  }
}
```

---

## 認証API

### 1. ログイン

ユーザー認証を行い、アクセストークンを発行する

**エンドポイント**

```
POST /auth/login
```

**リクエストボディ**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400,
    "user": {
      "sales_id": 1,
      "sales_name": "山田太郎",
      "email": "yamada@example.com",
      "department": "営業部",
      "position": "課長"
    }
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 認証失敗

---

### 2. ログアウト

現在のトークンを無効化する

**エンドポイント**

```
POST /auth/logout
```

**リクエストボディ**
なし

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "message": "ログアウトしました"
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証

---

### 3. トークン更新

アクセストークンを更新する

**エンドポイント**

```
POST /auth/refresh
```

**リクエストボディ**
なし

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 86400
  }
}
```

**ステータスコード**

- 200: 成功
- 401: トークン無効

---

## 日報API

### 1. 日報一覧取得

日報の一覧を取得する

**エンドポイント**

```
GET /daily-reports
```

**クエリパラメータ**
| パラメータ名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| sales_id | integer | - | 営業担当者ID |
| start_date | string | - | 開始日（YYYY-MM-DD） |
| end_date | string | - | 終了日（YYYY-MM-DD） |
| page | integer | - | ページ番号 |
| per_page | integer | - | 1ページあたりの件数 |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "report_id": 1,
        "sales_id": 1,
        "sales_name": "山田太郎",
        "report_date": "2026-01-02",
        "visit_count": 3,
        "comment_count": 2,
        "created_at": "2026-01-02T18:30:00Z",
        "updated_at": "2026-01-02T18:30:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_count": 50,
      "total_pages": 3
    }
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証
- 403: 権限なし

---

### 2. 日報詳細取得

指定した日報の詳細情報を取得する

**エンドポイント**

```
GET /daily-reports/{report_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| report_id | integer | 日報ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "report_id": 1,
    "sales_id": 1,
    "sales_name": "山田太郎",
    "department": "営業部",
    "report_date": "2026-01-02",
    "problem": "新規顧客の開拓が思うように進んでいない",
    "plan": "既存顧客へのフォローアップと紹介依頼を実施",
    "visit_records": [
      {
        "visit_id": 1,
        "customer_id": 10,
        "customer_name": "鈴木一郎",
        "company_name": "株式会社ABC",
        "visit_time": "10:00",
        "visit_content": "新商品の提案を実施。前向きな反応あり",
        "created_at": "2026-01-02T18:30:00Z"
      },
      {
        "visit_id": 2,
        "customer_id": 15,
        "customer_name": "佐藤花子",
        "company_name": "XYZ商事",
        "visit_time": "14:00",
        "visit_content": "契約更新の打ち合わせ。条件交渉中",
        "created_at": "2026-01-02T18:30:00Z"
      }
    ],
    "comments": [
      {
        "comment_id": 1,
        "sales_id": 5,
        "sales_name": "田中部長",
        "comment_content": "新規開拓については来週ミーティングで相談しましょう",
        "created_at": "2026-01-02T20:00:00Z"
      }
    ],
    "created_at": "2026-01-02T18:30:00Z",
    "updated_at": "2026-01-02T18:30:00Z"
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証
- 403: 権限なし
- 404: 日報が存在しない

---

### 3. 日報作成

新しい日報を作成する

**エンドポイント**

```
POST /daily-reports
```

**リクエストボディ**

```json
{
  "report_date": "2026-01-02",
  "problem": "新規顧客の開拓が思うように進んでいない",
  "plan": "既存顧客へのフォローアップと紹介依頼を実施",
  "visit_records": [
    {
      "customer_id": 10,
      "visit_time": "10:00",
      "visit_content": "新商品の提案を実施。前向きな反応あり"
    },
    {
      "customer_id": 15,
      "visit_time": "14:00",
      "visit_content": "契約更新の打ち合わせ。条件交渉中"
    }
  ]
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "report_id": 1,
    "sales_id": 1,
    "report_date": "2026-01-02",
    "problem": "新規顧客の開拓が思うように進んでいない",
    "plan": "既存顧客へのフォローアップと紹介依頼を実施",
    "created_at": "2026-01-02T18:30:00Z",
    "updated_at": "2026-01-02T18:30:00Z"
  }
}
```

**バリデーション**

- report_date: 必須、日付形式（YYYY-MM-DD）
- problem: 任意、最大2000文字
- plan: 任意、最大2000文字
- visit_records: 必須、1件以上
  - customer_id: 必須、存在する顧客ID
  - visit_time: 任意、時刻形式（HH:MM）
  - visit_content: 必須、最大1000文字

**ステータスコード**

- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 409: 同一日付の日報が既に存在

---

### 4. 日報更新

既存の日報を更新する

**エンドポイント**

```
PUT /daily-reports/{report_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| report_id | integer | 日報ID |

**リクエストボディ**

```json
{
  "report_date": "2026-01-02",
  "problem": "新規顧客の開拓が思うように進んでいない（更新版）",
  "plan": "既存顧客へのフォローアップと紹介依頼を実施",
  "visit_records": [
    {
      "visit_id": 1,
      "customer_id": 10,
      "visit_time": "10:00",
      "visit_content": "新商品の提案を実施。前向きな反応あり"
    },
    {
      "customer_id": 15,
      "visit_time": "14:00",
      "visit_content": "契約更新の打ち合わせ。条件交渉中"
    }
  ]
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "report_id": 1,
    "sales_id": 1,
    "report_date": "2026-01-02",
    "problem": "新規顧客の開拓が思うように進んでいない（更新版）",
    "plan": "既存顧客へのフォローアップと紹介依頼を実施",
    "updated_at": "2026-01-02T19:00:00Z"
  }
}
```

**注意事項**

- visit_recordsに既存のvisit_idが含まれる場合は更新、含まれない場合は新規作成
- リクエストに含まれないvisit_idの訪問記録は削除される

**ステータスコード**

- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（本人以外）
- 404: 日報が存在しない

---

### 5. 日報削除

指定した日報を削除する

**エンドポイント**

```
DELETE /daily-reports/{report_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| report_id | integer | 日報ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "message": "日報を削除しました"
  }
}
```

**ステータスコード**

- 200: 削除成功
- 401: 未認証
- 403: 権限なし（本人以外）
- 404: 日報が存在しない

---

## 訪問記録API

### 1. 訪問記録追加

既存の日報に訪問記録を追加する

**エンドポイント**

```
POST /daily-reports/{report_id}/visit-records
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| report_id | integer | 日報ID |

**リクエストボディ**

```json
{
  "customer_id": 20,
  "visit_time": "16:00",
  "visit_content": "追加の打ち合わせを実施"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "visit_id": 3,
    "report_id": 1,
    "customer_id": 20,
    "visit_time": "16:00",
    "visit_content": "追加の打ち合わせを実施",
    "created_at": "2026-01-02T19:00:00Z"
  }
}
```

**ステータスコード**

- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 日報が存在しない

---

### 2. 訪問記録更新

既存の訪問記録を更新する

**エンドポイント**

```
PUT /visit-records/{visit_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| visit_id | integer | 訪問記録ID |

**リクエストボディ**

```json
{
  "customer_id": 20,
  "visit_time": "16:30",
  "visit_content": "追加の打ち合わせを実施（更新版）"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "visit_id": 3,
    "report_id": 1,
    "customer_id": 20,
    "visit_time": "16:30",
    "visit_content": "追加の打ち合わせを実施（更新版）",
    "updated_at": "2026-01-02T19:30:00Z"
  }
}
```

**ステータスコード**

- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし
- 404: 訪問記録が存在しない

---

### 3. 訪問記録削除

指定した訪問記録を削除する

**エンドポイント**

```
DELETE /visit-records/{visit_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| visit_id | integer | 訪問記録ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "message": "訪問記録を削除しました"
  }
}
```

**ステータスコード**

- 200: 削除成功
- 401: 未認証
- 403: 権限なし
- 404: 訪問記録が存在しない

---

## コメントAPI

### 1. コメント一覧取得

指定した日報のコメント一覧を取得する

**エンドポイント**

```
GET /daily-reports/{report_id}/comments
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| report_id | integer | 日報ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "comment_id": 1,
        "sales_id": 5,
        "sales_name": "田中部長",
        "comment_content": "新規開拓については来週ミーティングで相談しましょう",
        "created_at": "2026-01-02T20:00:00Z",
        "updated_at": "2026-01-02T20:00:00Z"
      }
    ]
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証
- 403: 権限なし
- 404: 日報が存在しない

---

### 2. コメント作成

日報にコメントを追加する

**エンドポイント**

```
POST /daily-reports/{report_id}/comments
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| report_id | integer | 日報ID |

**リクエストボディ**

```json
{
  "comment_content": "新規開拓については来週ミーティングで相談しましょう"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "comment_id": 1,
    "report_id": 1,
    "sales_id": 5,
    "sales_name": "田中部長",
    "comment_content": "新規開拓については来週ミーティングで相談しましょう",
    "created_at": "2026-01-02T20:00:00Z"
  }
}
```

**バリデーション**

- comment_content: 必須、最大1000文字

**ステータスコード**

- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（上長のみ）
- 404: 日報が存在しない

---

### 3. コメント更新

既存のコメントを更新する

**エンドポイント**

```
PUT /comments/{comment_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| comment_id | integer | コメントID |

**リクエストボディ**

```json
{
  "comment_content": "新規開拓については来週ミーティングで相談しましょう（更新版）"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "comment_id": 1,
    "comment_content": "新規開拓については来週ミーティングで相談しましょう（更新版）",
    "updated_at": "2026-01-02T20:30:00Z"
  }
}
```

**ステータスコード**

- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（本人以外）
- 404: コメントが存在しない

---

### 4. コメント削除

指定したコメントを削除する

**エンドポイント**

```
DELETE /comments/{comment_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| comment_id | integer | コメントID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "message": "コメントを削除しました"
  }
}
```

**ステータスコード**

- 200: 削除成功
- 401: 未認証
- 403: 権限なし（本人以外）
- 404: コメントが存在しない

---

## 顧客マスタAPI

### 1. 顧客一覧取得

顧客マスタの一覧を取得する

**エンドポイント**

```
GET /customers
```

**クエリパラメータ**
| パラメータ名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| customer_name | string | - | 顧客名（部分一致） |
| company_name | string | - | 会社名（部分一致） |
| page | integer | - | ページ番号 |
| per_page | integer | - | 1ページあたりの件数 |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "customer_id": 1,
        "customer_name": "鈴木一郎",
        "company_name": "株式会社ABC",
        "phone": "03-1234-5678",
        "email": "suzuki@abc.co.jp",
        "address": "東京都千代田区...",
        "created_at": "2026-01-01T10:00:00Z",
        "updated_at": "2026-01-01T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_count": 100,
      "total_pages": 5
    }
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証

---

### 2. 顧客詳細取得

指定した顧客の詳細情報を取得する

**エンドポイント**

```
GET /customers/{customer_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| customer_id | integer | 顧客ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "customer_id": 1,
    "customer_name": "鈴木一郎",
    "company_name": "株式会社ABC",
    "phone": "03-1234-5678",
    "email": "suzuki@abc.co.jp",
    "address": "東京都千代田区丸の内1-1-1",
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:00:00Z"
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証
- 404: 顧客が存在しない

---

### 3. 顧客作成

新しい顧客を登録する

**エンドポイント**

```
POST /customers
```

**リクエストボディ**

```json
{
  "customer_name": "鈴木一郎",
  "company_name": "株式会社ABC",
  "phone": "03-1234-5678",
  "email": "suzuki@abc.co.jp",
  "address": "東京都千代田区丸の内1-1-1"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "customer_id": 1,
    "customer_name": "鈴木一郎",
    "company_name": "株式会社ABC",
    "phone": "03-1234-5678",
    "email": "suzuki@abc.co.jp",
    "address": "東京都千代田区丸の内1-1-1",
    "created_at": "2026-01-01T10:00:00Z"
  }
}
```

**バリデーション**

- customer_name: 必須、最大100文字
- company_name: 必須、最大200文字
- phone: 任意、電話番号形式
- email: 任意、メールアドレス形式
- address: 任意、最大500文字

**ステータスコード**

- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（管理者のみ）

---

### 4. 顧客更新

既存の顧客情報を更新する

**エンドポイント**

```
PUT /customers/{customer_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| customer_id | integer | 顧客ID |

**リクエストボディ**

```json
{
  "customer_name": "鈴木一郎",
  "company_name": "株式会社ABC",
  "phone": "03-1234-5679",
  "email": "suzuki@abc.co.jp",
  "address": "東京都千代田区丸の内1-1-1"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "customer_id": 1,
    "customer_name": "鈴木一郎",
    "company_name": "株式会社ABC",
    "phone": "03-1234-5679",
    "email": "suzuki@abc.co.jp",
    "address": "東京都千代田区丸の内1-1-1",
    "updated_at": "2026-01-02T15:00:00Z"
  }
}
```

**ステータスコード**

- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（管理者のみ）
- 404: 顧客が存在しない

---

### 5. 顧客削除

指定した顧客を削除する

**エンドポイント**

```
DELETE /customers/{customer_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| customer_id | integer | 顧客ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "message": "顧客を削除しました"
  }
}
```

**ステータスコード**

- 200: 削除成功
- 401: 未認証
- 403: 権限なし（管理者のみ）
- 404: 顧客が存在しない
- 409: 訪問記録に紐づいているため削除不可

---

## 営業マスタAPI

### 1. 営業担当者一覧取得

営業担当者マスタの一覧を取得する

**エンドポイント**

```
GET /sales
```

**クエリパラメータ**
| パラメータ名 | 型 | 必須 | 説明 |
|-------------|-----|------|------|
| sales_name | string | - | 営業担当者名（部分一致） |
| department | string | - | 部署 |
| page | integer | - | ページ番号 |
| per_page | integer | - | 1ページあたりの件数 |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "sales_id": 1,
        "sales_name": "山田太郎",
        "email": "yamada@example.com",
        "department": "営業部",
        "position": "課長",
        "created_at": "2026-01-01T10:00:00Z",
        "updated_at": "2026-01-01T10:00:00Z"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total_count": 50,
      "total_pages": 3
    }
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証
- 403: 権限なし（管理者のみ）

---

### 2. 営業担当者詳細取得

指定した営業担当者の詳細情報を取得する

**エンドポイント**

```
GET /sales/{sales_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| sales_id | integer | 営業担当者ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "sales_id": 1,
    "sales_name": "山田太郎",
    "email": "yamada@example.com",
    "department": "営業部",
    "position": "課長",
    "created_at": "2026-01-01T10:00:00Z",
    "updated_at": "2026-01-01T10:00:00Z"
  }
}
```

**ステータスコード**

- 200: 成功
- 401: 未認証
- 403: 権限なし（管理者のみ、または本人）
- 404: 営業担当者が存在しない

---

### 3. 営業担当者作成

新しい営業担当者を登録する

**エンドポイント**

```
POST /sales
```

**リクエストボディ**

```json
{
  "sales_name": "山田太郎",
  "email": "yamada@example.com",
  "password": "password123",
  "department": "営業部",
  "position": "課長"
}
```

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "sales_id": 1,
    "sales_name": "山田太郎",
    "email": "yamada@example.com",
    "department": "営業部",
    "position": "課長",
    "created_at": "2026-01-01T10:00:00Z"
  }
}
```

**バリデーション**

- sales_name: 必須、最大100文字
- email: 必須、メールアドレス形式、一意
- password: 必須、8文字以上
- department: 必須
- position: 必須

**ステータスコード**

- 201: 作成成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（管理者のみ）
- 409: メールアドレスが既に登録済み

---

### 4. 営業担当者更新

既存の営業担当者情報を更新する

**エンドポイント**

```
PUT /sales/{sales_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| sales_id | integer | 営業担当者ID |

**リクエストボディ**

```json
{
  "sales_name": "山田太郎",
  "email": "yamada@example.com",
  "password": "newpassword123",
  "department": "営業部",
  "position": "部長"
}
```

**注意事項**

- passwordは任意。指定した場合のみパスワードを更新

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "sales_id": 1,
    "sales_name": "山田太郎",
    "email": "yamada@example.com",
    "department": "営業部",
    "position": "部長",
    "updated_at": "2026-01-02T15:00:00Z"
  }
}
```

**ステータスコード**

- 200: 更新成功
- 400: バリデーションエラー
- 401: 未認証
- 403: 権限なし（管理者のみ）
- 404: 営業担当者が存在しない
- 409: メールアドレスが既に登録済み

---

### 5. 営業担当者削除

指定した営業担当者を削除する

**エンドポイント**

```
DELETE /sales/{sales_id}
```

**パスパラメータ**
| パラメータ名 | 型 | 説明 |
|-------------|-----|------|
| sales_id | integer | 営業担当者ID |

**レスポンス（成功時）**

```json
{
  "status": "success",
  "data": {
    "message": "営業担当者を削除しました"
  }
}
```

**ステータスコード**

- 200: 削除成功
- 401: 未認証
- 403: 権限なし（管理者のみ）
- 404: 営業担当者が存在しない
- 409: 日報やコメントに紐づいているため削除不可

---

## エラーコード

### 認証・認可エラー

| コード   | メッセージ         | 説明                                       |
| -------- | ------------------ | ------------------------------------------ |
| AUTH_001 | 認証に失敗しました | メールアドレスまたはパスワードが正しくない |
| AUTH_002 | トークンが無効です | トークンの有効期限切れまたは不正           |
| AUTH_003 | 権限がありません   | リソースへのアクセス権限がない             |

### バリデーションエラー

| コード    | メッセージ                   | 説明                               |
| --------- | ---------------------------- | ---------------------------------- |
| VALID_001 | 必須項目が入力されていません | 必須フィールドが未入力             |
| VALID_002 | 入力形式が正しくありません   | フォーマット不正（メール、日付等） |
| VALID_003 | 文字数制限を超えています     | 最大文字数を超過                   |
| VALID_004 | 不正な値です                 | 許可されていない値が指定された     |

### ビジネスロジックエラー

| コード  | メッセージ                             | 説明                 |
| ------- | -------------------------------------- | -------------------- |
| BIZ_001 | 同一日付の日報が既に存在します         | 重複登録エラー       |
| BIZ_002 | 訪問記録が1件も登録されていません      | 日報に訪問記録が必要 |
| BIZ_003 | 削除できません。関連データが存在します | 外部キー制約違反     |
| BIZ_004 | メールアドレスが既に登録されています   | 一意制約違反         |

### システムエラー

| コード  | メッセージ                       | 説明                             |
| ------- | -------------------------------- | -------------------------------- |
| SYS_001 | サーバーエラーが発生しました     | 内部エラー                       |
| SYS_002 | データベースエラーが発生しました | DB接続エラー等                   |
| SYS_003 | リソースが見つかりません         | 指定されたIDのデータが存在しない |

---

## 改訂履歴

| 版数 | 改訂日     | 改訂者 | 改訂内容 |
| ---- | ---------- | ------ | -------- |
| 1.0  | 2026/01/02 | -      | 初版作成 |
