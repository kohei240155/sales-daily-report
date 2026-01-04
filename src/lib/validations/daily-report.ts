import { z } from 'zod'

import { visitRecordInputSchema, visitRecordUpdateInputSchema } from './visit-record'

/**
 * 日報作成の入力スキーマ
 * API仕様: POST /daily-reports
 *
 * バリデーションルール:
 * - report_date: 必須、YYYY-MM-DD形式、未来日は不可
 * - problem: 任意、最大2000文字
 * - plan: 任意、最大2000文字
 * - visit_records: 必須、1件以上
 */
export const createDailyReportSchema = z.object({
  report_date: z
    .string()
    .min(1, '日報日付を入力してください')
    .regex(/^\d{4}-\d{2}-\d{2}$/, '日付はYYYY-MM-DD形式で入力してください')
    .refine((date) => {
      const inputDate = new Date(date)
      const today = new Date()
      today.setHours(23, 59, 59, 999) // 今日の終わりまで
      return inputDate <= today
    }, '未来日の日報は作成できません'),
  problem: z
    .string()
    .max(2000, '課題・相談は2000文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  plan: z
    .string()
    .max(2000, '明日の予定は2000文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  visit_records: z
    .array(visitRecordInputSchema)
    .min(1, '訪問記録は1件以上登録してください'),
})

/**
 * 日報更新の入力スキーマ
 * API仕様: PUT /daily-reports/{report_id}
 *
 * 注意事項:
 * - visit_recordsに既存のvisit_idが含まれる場合は更新
 * - visit_idがない場合は新規作成
 * - リクエストに含まれないvisit_idの訪問記録は削除される
 */
export const updateDailyReportSchema = z.object({
  report_date: z
    .string()
    .min(1, '日報日付を入力してください')
    .regex(/^\d{4}-\d{2}-\d{2}$/, '日付はYYYY-MM-DD形式で入力してください')
    .refine((date) => {
      const inputDate = new Date(date)
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      return inputDate <= today
    }, '未来日の日報は作成できません'),
  problem: z
    .string()
    .max(2000, '課題・相談は2000文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  plan: z
    .string()
    .max(2000, '明日の予定は2000文字以内で入力してください')
    .optional()
    .or(z.literal('')),
  visit_records: z
    .array(visitRecordUpdateInputSchema)
    .min(1, '訪問記録は1件以上登録してください'),
})

/**
 * 日報検索の入力スキーマ
 * API仕様: GET /daily-reports
 *
 * クエリパラメータ:
 * - sales_id: 営業担当者ID（任意）
 * - start_date: 開始日（任意、YYYY-MM-DD）
 * - end_date: 終了日（任意、YYYY-MM-DD）
 * - page: ページ番号（デフォルト: 1）
 * - per_page: 1ページあたりの件数（デフォルト: 20、最大: 100）
 */
export const searchDailyReportSchema = z.object({
  sales_id: z.number().int().positive().optional(),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '開始日はYYYY-MM-DD形式で入力してください')
    .optional()
    .or(z.literal('')),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, '終了日はYYYY-MM-DD形式で入力してください')
    .optional()
    .or(z.literal('')),
  page: z.number().int().positive().default(1),
  per_page: z.number().int().positive().max(100).default(20),
})

// 型定義のエクスポート
export type CreateDailyReportInput = z.infer<typeof createDailyReportSchema>
export type UpdateDailyReportInput = z.infer<typeof updateDailyReportSchema>
export type SearchDailyReportInput = z.infer<typeof searchDailyReportSchema>
