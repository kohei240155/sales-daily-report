import { z } from 'zod'

/**
 * 訪問記録の入力スキーマ
 * 日報作成・更新時に使用
 */
export const visitRecordInputSchema = z.object({
  customer_id: z
    .number()
    .int()
    .positive('顧客を選択してください'),
  visit_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, '時刻はHH:MM形式で入力してください')
    .optional()
    .or(z.literal('')),
  visit_content: z
    .string()
    .min(1, '訪問内容を入力してください')
    .max(1000, '訪問内容は1000文字以内で入力してください'),
})

/**
 * 訪問記録更新時の入力スキーマ（既存の訪問記録を含む）
 */
export const visitRecordUpdateInputSchema = visitRecordInputSchema.extend({
  visit_id: z.number().int().positive().optional(),
})

/**
 * 訪問記録作成スキーマ
 * API仕様: POST /daily-reports/{report_id}/visit-records
 */
export const createVisitRecordSchema = z.object({
  customer_id: z
    .number()
    .int()
    .positive('顧客を選択してください'),
  visit_time: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, '時刻はHH:MM形式で入力してください')
    .optional()
    .or(z.literal('')),
  visit_content: z
    .string()
    .min(1, '訪問内容を入力してください')
    .max(1000, '訪問内容は1000文字以内で入力してください'),
})

/**
 * 訪問記録更新スキーマ
 * API仕様: PUT /visit-records/{visit_id}
 */
export const updateVisitRecordSchema = createVisitRecordSchema

// 型定義のエクスポート
export type VisitRecordInput = z.infer<typeof visitRecordInputSchema>
export type VisitRecordUpdateInput = z.infer<typeof visitRecordUpdateInputSchema>
export type CreateVisitRecordInput = z.infer<typeof createVisitRecordSchema>
export type UpdateVisitRecordInput = z.infer<typeof updateVisitRecordSchema>
