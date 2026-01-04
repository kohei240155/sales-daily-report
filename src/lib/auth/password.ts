import bcrypt from 'bcryptjs'

/**
 * パスワードハッシュ化のソルトラウンド数
 * セキュリティと性能のバランスを考慮して10を推奨
 */
const SALT_ROUNDS = 10

/**
 * パスワードハッシュ化エラー
 */
export class PasswordHashError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PasswordHashError'
  }
}

/**
 * パスワード検証エラー
 */
export class PasswordVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PasswordVerificationError'
  }
}

/**
 * パスワードをハッシュ化する
 * bcryptを使用してパスワードを安全にハッシュ化します
 *
 * @param password - ハッシュ化する平文パスワード
 * @returns ハッシュ化されたパスワード
 * @throws パスワードが空またはハッシュ化に失敗した場合
 *
 * @example
 * ```typescript
 * const hashedPassword = await hashPassword('mySecurePassword123')
 * // $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
 * ```
 */
export async function hashPassword(password: string): Promise<string> {
  // バリデーション
  if (!password || typeof password !== 'string') {
    throw new PasswordHashError('パスワードは必須です')
  }

  if (password.trim().length === 0) {
    throw new PasswordHashError('パスワードは空にできません')
  }

  // 長すぎるパスワードは bcrypt の制限（72バイト）に引っかかる可能性があるため警告
  if (password.length > 72) {
    throw new PasswordHashError('パスワードは72文字以内にしてください')
  }

  try {
    // ソルトを生成してパスワードをハッシュ化
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
  } catch (error) {
    if (error instanceof Error) {
      throw new PasswordHashError(`パスワードのハッシュ化に失敗しました: ${error.message}`)
    }
    throw new PasswordHashError('パスワードのハッシュ化に失敗しました')
  }
}

/**
 * パスワードを検証する
 * 入力された平文パスワードとハッシュ化されたパスワードを比較します
 *
 * @param password - 検証する平文パスワード
 * @param hashedPassword - データベースに保存されているハッシュ化されたパスワード
 * @returns パスワードが一致する場合はtrue、それ以外はfalse
 * @throws パスワードまたはハッシュが無効な場合
 *
 * @example
 * ```typescript
 * const isValid = await verifyPassword('mySecurePassword123', hashedPassword)
 * if (isValid) {
 *   console.log('パスワードが一致しました')
 * } else {
 *   console.log('パスワードが一致しません')
 * }
 * ```
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // バリデーション
  if (!password || typeof password !== 'string') {
    throw new PasswordVerificationError('パスワードは必須です')
  }

  if (!hashedPassword || typeof hashedPassword !== 'string') {
    throw new PasswordVerificationError('ハッシュ化されたパスワードは必須です')
  }

  // bcryptハッシュの形式チェック（$2a$, $2b$, $2y$ で始まる）
  if (!hashedPassword.match(/^\$2[aby]\$/)) {
    throw new PasswordVerificationError('ハッシュ化されたパスワードの形式が無効です')
  }

  try {
    // パスワードを検証
    const isMatch = await bcrypt.compare(password, hashedPassword)
    return isMatch
  } catch (error) {
    if (error instanceof Error) {
      throw new PasswordVerificationError(`パスワードの検証に失敗しました: ${error.message}`)
    }
    throw new PasswordVerificationError('パスワードの検証に失敗しました')
  }
}

/**
 * パスワードの強度を検証する
 * 最低限のセキュリティ要件を満たしているかチェックします
 *
 * @param password - 検証するパスワード
 * @returns 検証結果オブジェクト
 *
 * @example
 * ```typescript
 * const validation = validatePasswordStrength('MyPass123!')
 * if (!validation.isValid) {
 *   console.log('エラー:', validation.errors.join(', '))
 * }
 * ```
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  // 長さチェック（最低8文字）
  if (password.length < 8) {
    errors.push('パスワードは8文字以上である必要があります')
  }

  // 最大長チェック
  if (password.length > 72) {
    errors.push('パスワードは72文字以内にしてください')
  }

  // 大文字を含むかチェック
  if (!/[A-Z]/.test(password)) {
    errors.push('パスワードには大文字を1文字以上含める必要があります')
  }

  // 小文字を含むかチェック
  if (!/[a-z]/.test(password)) {
    errors.push('パスワードには小文字を1文字以上含める必要があります')
  }

  // 数字を含むかチェック
  if (!/[0-9]/.test(password)) {
    errors.push('パスワードには数字を1文字以上含める必要があります')
  }

  // 特殊文字を含むかチェック（オプション: 要件に応じて調整）
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('パスワードには特殊文字を1文字以上含めることを推奨します')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * パスワードが以前使用されたものと同じかチェックする
 * ユーザーが過去に使用したパスワードと同じものを使用していないか確認します
 *
 * @param newPassword - 新しいパスワード
 * @param previousHashedPasswords - 以前使用されたハッシュ化パスワードの配列
 * @returns パスワードが以前使用されている場合はtrue
 *
 * @example
 * ```typescript
 * const isReused = await isPasswordReused('newPass123', previousPasswords)
 * if (isReused) {
 *   throw new Error('過去に使用したパスワードは使用できません')
 * }
 * ```
 */
export async function isPasswordReused(
  newPassword: string,
  previousHashedPasswords: string[]
): Promise<boolean> {
  if (!previousHashedPasswords || previousHashedPasswords.length === 0) {
    return false
  }

  // 全ての過去のパスワードと比較
  const comparisonResults = await Promise.all(
    previousHashedPasswords.map((hashedPassword) => bcrypt.compare(newPassword, hashedPassword))
  )

  // いずれかと一致した場合は true を返す
  return comparisonResults.some((result) => result === true)
}
