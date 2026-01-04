import { z } from 'zod'

/**
 * 顧客作成の入力スキーマ
 */
export const createCustomerSchema = z.object({
  customer_name: z.string().min(1, '顧客名を入力してください').max(100, '顧客名は100文字以内で入力してください'),
  company_name: z.string().min(1, '会社名を入力してください').max(200, '会社名は200文字以内で入力してください'),
  phone: z.string().regex(/^[0-9-]+$/, '電話番号は数字とハイフンのみ使用できます').optional().or(z.literal('')),
  email: z.string().email('正しいメールアドレス形式で入力してください').optional().or(z.literal('')),
  address: z.string().max(500, '住所は500文字以内で入力してください').optional().or(z.literal('')),
})

/**
 * 顧客更新の入力スキーマ
 */
export const updateCustomerSchema = createCustomerSchema

/**
 * 顧客検索の入力スキーマ
 */
export const searchCustomerSchema = z.object({
  customer_name: z.string().optional().or(z.literal('')),
  company_name: z.string().optional().or(z.literal('')),
  page: z.number().int().positive().default(1),
  per_page: z.number().int().positive().max(100).default(20),
})

// 型定義のエクスポート
export type CreateCustomerInput = z.infer<typeof createCustomerSchema>
export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>
export type SearchCustomerInput = z.infer<typeof searchCustomerSchema>
