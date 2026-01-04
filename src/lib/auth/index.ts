/**
 * 認証モジュール
 * JWT認証とパスワードハッシュ化機能を提供
 */

// JWT関連のエクスポート
export {
  signToken,
  verifyToken,
  signRefreshToken,
  verifyRefreshToken,
  generateTokenPair,
  refreshTokenPair,
  JWTVerificationError,
  type JWTPayload,
  type RefreshTokenPayload,
  type TokenPair,
} from './jwt'

// パスワード関連のエクスポート
export {
  hashPassword,
  verifyPassword,
  validatePasswordStrength,
  isPasswordReused,
  PasswordHashError,
  PasswordVerificationError,
} from './password'
