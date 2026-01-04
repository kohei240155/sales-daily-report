import { z } from 'zod'

/**
 * コメント作成の入力スキーマ
 * API仕様: POST /daily-reports/{report_id}/comments
 *
 * バリデーションルール:
 * - comment_content: 必須、最大1000文字
 *
 * 権限: 上長のみコメント追加可能
 */
export const createCommentSchema = z.object({
  comment_content: z
    .string()
    .min(1, 'コメント内容を入力してください')
    .max(1000, 'コメント内容は1000文字以内で入力してください'),
})

/**
 * コメント更新の入力スキーマ
 * API仕様: PUT /comments/{comment_id}
 *
 * 権限: 本人のみ編集可能
 */
export const updateCommentSchema = createCommentSchema

// 型定義のエクスポート
export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
