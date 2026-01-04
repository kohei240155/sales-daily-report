import { z } from 'zod'

/**
 * ログイン入力スキーマ
 * API仕様: POST /auth/login
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('正しいメールアドレス形式で入力してください')
    .max(255, 'メールアドレスは255文字以内で入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください'),
})

/**
 * ログインレスポンスの型定義
 */
export const loginResponseSchema = z.object({
  token: z.string(),
  expires_in: z.number(),
  user: z.object({
    sales_id: z.number(),
    sales_name: z.string(),
    email: z.string().email(),
    department: z.string(),
    position: z.string(),
  }),
})

// 型定義のエクスポート
export type LoginInput = z.infer<typeof loginSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
