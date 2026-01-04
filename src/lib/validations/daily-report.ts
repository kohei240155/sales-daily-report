import { z } from 'zod'

/**
 * 訪問記録の入力スキーマ
 */
export const visitRecordInputSchema = z.object({
  customer_id: z.number().int().positive('顧客IDを選択してください'),
  visit_time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, '時刻はHH:MM形式で入力してください').optional().or(z.literal('')),
  visit_content: z.string().min(1, '訪問内容を入力してください').max(1000, '訪問内容は1000文字以内で入力してください'),
})

/**
 * 日報作成の入力スキーマ
 */
export const createDailyReportSchema = z.object({
  report_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付はYYYY-MM-DD形式で入力してください'),
  problem: z.string().max(2000, '課題・相談は2000文字以内で入力してください').optional().or(z.literal('')),
  plan: z.string().max(2000, '明日の予定は2000文字以内で入力してください').optional().or(z.literal('')),
  visit_records: z.array(visitRecordInputSchema).min(1, '訪問記録は1件以上登録してください'),
})

/**
 * 日報更新の入力スキーマ
 */
export const updateDailyReportSchema = createDailyReportSchema.extend({
  visit_records: z.array(
    visitRecordInputSchema.extend({
      visit_id: z.number().int().positive().optional(),
    })
  ).min(1, '訪問記録は1件以上登録してください'),
})

/**
 * 日報検索の入力スキーマ
 */
export const searchDailyReportSchema = z.object({
  sales_id: z.number().int().positive().optional(),
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal('')),
  page: z.number().int().positive().default(1),
  per_page: z.number().int().positive().max(100).default(20),
})

// 型定義のエクスポート
export type VisitRecordInput = z.infer<typeof visitRecordInputSchema>
export type CreateDailyReportInput = z.infer<typeof createDailyReportSchema>
export type UpdateDailyReportInput = z.infer<typeof updateDailyReportSchema>
export type SearchDailyReportInput = z.infer<typeof searchDailyReportSchema>
