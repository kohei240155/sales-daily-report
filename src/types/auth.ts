/**
 * 認証関連の型定義
 */

import type { JWTPayload, RefreshTokenPayload, TokenPair } from '@/lib/auth/jwt'

/**
 * ログインリクエストの型
 */
export interface LoginRequest {
  email: string
  password: string
}

/**
 * ログインレスポンスの型
 */
export interface LoginResponse {
  token: string
  refreshToken: string
  expiresIn: number
  user: {
    sales_id: number
    sales_name: string
    email: string
    department: string
    position: string
  }
}

/**
 * トークンリフレッシュリクエストの型
 */
export interface RefreshTokenRequest {
  refreshToken: string
}

/**
 * トークンリフレッシュレスポンスの型
 */
export interface RefreshTokenResponse {
  token: string
  refreshToken: string
  expiresIn: number
}

/**
 * 認証済みユーザー情報の型
 */
export interface AuthenticatedUser {
  sales_id: number
  email: string
  department: string
  position: string
}

/**
 * パスワード変更リクエストの型
 */
export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

/**
 * パスワードリセットリクエストの型
 */
export interface ResetPasswordRequest {
  email: string
}

/**
 * パスワードリセット確認リクエストの型
 */
export interface ResetPasswordConfirmRequest {
  token: string
  newPassword: string
  confirmPassword: string
}

// JWTペイロード型の再エクスポート（外部から利用しやすくするため）
export type { JWTPayload, RefreshTokenPayload, TokenPair }
