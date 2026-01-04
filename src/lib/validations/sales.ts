import { z } from 'zod'

/**
 * 営業担当者作成の入力スキーマ
 */
export const createSalesSchema = z.object({
  sales_name: z.string().min(1, '営業担当者名を入力してください').max(100, '営業担当者名は100文字以内で入力してください'),
  email: z.string().email('正しいメールアドレス形式で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  password_confirm: z.string().min(8, 'パスワード（確認）は8文字以上で入力してください'),
  department: z.string().min(1, '部署を入力してください').max(100, '部署は100文字以内で入力してください'),
  position: z.string().min(1, '役職を選択してください').max(50, '役職は50文字以内で入力してください'),
}).refine((data) => data.password === data.password_confirm, {
  message: 'パスワードとパスワード（確認）が一致しません',
  path: ['password_confirm'],
})

/**
 * 営業担当者更新の入力スキーマ
 */
export const updateSalesSchema = z.object({
  sales_name: z.string().min(1, '営業担当者名を入力してください').max(100, '営業担当者名は100文字以内で入力してください'),
  email: z.string().email('正しいメールアドレス形式で入力してください'),
  password: z.string().min(8, 'パスワードは8文字以上で入力してください').optional().or(z.literal('')),
  password_confirm: z.string().optional().or(z.literal('')),
  department: z.string().min(1, '部署を入力してください').max(100, '部署は100文字以内で入力してください'),
  position: z.string().min(1, '役職を選択してください').max(50, '役職は50文字以内で入力してください'),
}).refine(
  (data) => {
    // パスワードが入力されている場合のみ確認
    if (data.password && data.password.length > 0) {
      return data.password === data.password_confirm
    }
    return true
  },
  {
    message: 'パスワードとパスワード（確認）が一致しません',
    path: ['password_confirm'],
  }
)

/**
 * 営業担当者検索の入力スキーマ
 */
export const searchSalesSchema = z.object({
  sales_name: z.string().optional().or(z.literal('')),
  department: z.string().optional().or(z.literal('')),
  page: z.number().int().positive().default(1),
  per_page: z.number().int().positive().max(100).default(20),
})

// 型定義のエクスポート
export type CreateSalesInput = z.infer<typeof createSalesSchema>
export type UpdateSalesInput = z.infer<typeof updateSalesSchema>
export type SearchSalesInput = z.infer<typeof searchSalesSchema>
