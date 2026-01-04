import { z } from 'zod'

/**
 * ログイン入力スキーマ
 */
export const loginSchema = z.object({
  email: z.string().email('正しいメールアドレス形式で入力してください'),
  password: z.string().min(1, 'パスワードを入力してください'),
})

// 型定義のエクスポート
export type LoginInput = z.infer<typeof loginSchema>
