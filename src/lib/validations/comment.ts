import { z } from 'zod'

/**
 * コメント作成の入力スキーマ
 */
export const createCommentSchema = z.object({
  comment_content: z.string().min(1, 'コメント内容を入力してください').max(1000, 'コメント内容は1000文字以内で入力してください'),
})

/**
 * コメント更新の入力スキーマ
 */
export const updateCommentSchema = createCommentSchema

// 型定義のエクスポート
export type CreateCommentInput = z.infer<typeof createCommentSchema>
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>
