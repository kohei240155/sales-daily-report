# GitHub Actions セットアップガイド

このドキュメントでは、GitHub ActionsでCI/CDパイプラインを実行するために必要なセットアップ手順を説明します。

## 必要なGitHubシークレット

以下のシークレットをGitHubリポジトリに設定する必要があります。

### リポジトリシークレットの設定方法

1. GitHubリポジトリページにアクセス
2. `Settings` > `Secrets and variables` > `Actions` に移動
3. `New repository secret` をクリック
4. 各シークレットを追加

### 必須シークレット一覧

#### 1. GCP_PROJECT_ID

- **説明**: Google CloudプロジェクトID
- **例**: `my-project-12345`
- **取得方法**: GCPコンソールのプロジェクト選択画面で確認

#### 2. GCP_SA_KEY

- **説明**: Google CloudサービスアカウントのJSONキー（Base64エンコード不要）
- **取得方法**:
  1. GCPコンソールで `IAM と管理` > `サービスアカウント` に移動
  2. 新しいサービスアカウントを作成（または既存のものを使用）
  3. 必要な権限を付与:
     - Cloud Run 管理者
     - Cloud Build 編集者
     - Container Registry サービスエージェント
     - Cloud SQL クライアント
  4. `キー` タブから `鍵を追加` > `新しい鍵を作成` > `JSON` を選択
  5. ダウンロードしたJSONファイルの内容をそのままシークレットに設定

#### 3. DATABASE_URL

- **説明**: PostgreSQLデータベース接続URL
- **例**: `postgresql://user:password@localhost:5432/sales_daily_report`
- **本番環境**: Cloud SQLの接続URLを使用
  ```
  postgresql://user:password@/database?host=/cloudsql/PROJECT_ID:REGION:INSTANCE_NAME
  ```

#### 4. JWT_SECRET

- **説明**: JWT認証用のシークレットキー
- **生成方法**:
  ```bash
  openssl rand -base64 32
  ```
- **注意**: 本番環境用に強力なランダム文字列を生成してください

#### 5. CLOUD_SQL_CONNECTION_NAME

- **説明**: Cloud SQLインスタンスの接続名
- **例**: `my-project-12345:asia-northeast1:sales-db`
- **取得方法**: GCPコンソールの `SQL` > インスタンス詳細ページで確認

## ワークフロー説明

### CI ワークフロー (ci.yml)

**トリガー**:

- `main`, `develop` ブランチへのプッシュ
- `main`, `develop` ブランチへのプルリクエスト

**ジョブ**:

1. **Lint**: ESLintでコード品質をチェック
2. **Type Check**: TypeScriptの型チェック
3. **Test**: Vitestでユニットテスト実行

### デプロイワークフロー (deploy.yml)

**トリガー**:

- `main` ブランチへのプッシュ（本番デプロイ）

**ジョブ**:

1. Dockerイメージのビルド
2. Google Container Registryへのプッシュ
3. Cloud Runへのデプロイ

## セットアップ確認

### 1. シークレットが正しく設定されているか確認

```bash
# GitHubリポジトリのシークレット一覧を確認（GitHub CLIを使用）
gh secret list
```

以下のシークレットが表示されることを確認:

- GCP_PROJECT_ID
- GCP_SA_KEY
- DATABASE_URL
- JWT_SECRET
- CLOUD_SQL_CONNECTION_NAME

### 2. CI ワークフローのテスト

プルリクエストを作成すると、自動的にCIワークフローが実行されます。

```bash
# 新しいブランチを作成
git checkout -b test/ci-workflow

# 軽微な変更をコミット
echo "# Test" >> README.md
git add README.md
git commit -m "test: CI workflow"

# プッシュしてプルリクエストを作成
git push -u origin test/ci-workflow
gh pr create --title "Test: CI Workflow" --body "CI動作確認"
```

### 3. デプロイワークフローのテスト

**注意**: デプロイワークフローは`main`ブランチへのマージ時に実行されます。テスト前にGCP環境が正しく設定されていることを確認してください。

## トラブルシューティング

### 問題: デプロイが失敗する

**確認事項**:

1. GCPサービスアカウントに必要な権限が付与されているか
2. Cloud SQLインスタンスが起動しているか
3. シークレットが正しく設定されているか

### 問題: Lintでエラーが出る

**対処法**:

```bash
# ローカルでLintを実行して修正
npm run lint:fix
```

### 問題: 型チェックでエラーが出る

**対処法**:

```bash
# ローカルで型チェックを実行
npm run type-check
```

エラーメッセージを確認し、型定義を修正してください。

## 参考リンク

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Google Cloud Run Documentation](https://cloud.google.com/run/docs)
- [google-github-actions/setup-gcloud](https://github.com/google-github-actions/setup-gcloud)
