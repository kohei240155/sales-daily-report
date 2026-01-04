import { SignJWT, jwtVerify } from 'jose'

/**
 * アクセストークンのペイロード型定義
 */
export interface JWTPayload {
  sales_id: number
  email: string
  department: string
  position: string
  iat?: number
  exp?: number
}

/**
 * リフレッシュトークンのペイロード型定義
 */
export interface RefreshTokenPayload {
  sales_id: number
  email: string
  type: 'refresh'
  iat?: number
  exp?: number
}

/**
 * トークンペア型定義
 */
export interface TokenPair {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

/**
 * JWT検証エラー
 */
export class JWTVerificationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'JWTVerificationError'
  }
}

/**
 * 環境変数からシークレットキーを取得する
 * @returns エンコードされたシークレットキー
 * @throws シークレットキーが未定義の場合
 */
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  return new TextEncoder().encode(secret)
}

/**
 * アクセストークンを生成する
 * @param payload - トークンに含めるペイロード情報
 * @param expiresIn - トークンの有効期限（デフォルト: 24h）
 * @returns 署名済みのJWTアクセストークン
 */
export async function signToken(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  expiresIn: string = process.env.JWT_EXPIRES_IN || '24h'
): Promise<string> {
  const secret = getSecret()

  const token = await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)

  return token
}

/**
 * アクセストークンを検証・復号する
 * @param token - 検証するJWTトークン
 * @returns デコードされたペイロード
 * @throws トークンが無効または期限切れの場合
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
  const secret = getSecret()

  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JWTPayload
  } catch (error) {
    if (error instanceof Error) {
      // より具体的なエラーメッセージを提供
      if (error.message.includes('expired')) {
        throw new JWTVerificationError('トークンの有効期限が切れています')
      }
      if (error.message.includes('invalid')) {
        throw new JWTVerificationError('トークンが無効です')
      }
      throw new JWTVerificationError(`トークン検証に失敗しました: ${error.message}`)
    }
    throw new JWTVerificationError('トークン検証に失敗しました')
  }
}

/**
 * リフレッシュトークンを生成する
 * @param payload - トークンに含めるペイロード情報
 * @param expiresIn - トークンの有効期限（デフォルト: 7d）
 * @returns 署名済みのJWTリフレッシュトークン
 */
export async function signRefreshToken(
  payload: Omit<RefreshTokenPayload, 'type' | 'iat' | 'exp'>,
  expiresIn: string = '7d'
): Promise<string> {
  const secret = getSecret()

  const fullPayload: Omit<RefreshTokenPayload, 'iat' | 'exp'> = {
    ...payload,
    type: 'refresh',
  }

  const token = await new SignJWT(fullPayload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secret)

  return token
}

/**
 * リフレッシュトークンを検証・復号する
 * @param token - 検証するリフレッシュトークン
 * @returns デコードされたペイロード
 * @throws トークンが無効、期限切れ、またはリフレッシュトークンではない場合
 */
export async function verifyRefreshToken(token: string): Promise<RefreshTokenPayload> {
  const secret = getSecret()

  try {
    const { payload } = await jwtVerify(token, secret)
    const typedPayload = payload as unknown as RefreshTokenPayload

    // リフレッシュトークンであることを確認
    if (typedPayload.type !== 'refresh') {
      throw new JWTVerificationError('無効なトークンタイプです')
    }

    return typedPayload
  } catch (error) {
    if (error instanceof JWTVerificationError) {
      throw error
    }
    if (error instanceof Error) {
      if (error.message.includes('expired')) {
        throw new JWTVerificationError('リフレッシュトークンの有効期限が切れています')
      }
      if (error.message.includes('invalid')) {
        throw new JWTVerificationError('リフレッシュトークンが無効です')
      }
      throw new JWTVerificationError(`リフレッシュトークン検証に失敗しました: ${error.message}`)
    }
    throw new JWTVerificationError('リフレッシュトークン検証に失敗しました')
  }
}

/**
 * アクセストークンとリフレッシュトークンのペアを生成する
 * @param payload - トークンに含めるユーザー情報
 * @returns トークンペア（アクセストークン、リフレッシュトークン、有効期限）
 */
export async function generateTokenPair(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<TokenPair> {
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h'

  // アクセストークンとリフレッシュトークンを並行して生成
  const [accessToken, refreshToken] = await Promise.all([
    signToken(payload, expiresIn),
    signRefreshToken({ sales_id: payload.sales_id, email: payload.email }),
  ])

  // 有効期限を秒数で返す（24時間 = 86400秒）
  const expiresInSeconds = expiresIn.endsWith('h') ? parseInt(expiresIn) * 3600 : 86400

  return {
    accessToken,
    refreshToken,
    expiresIn: expiresInSeconds,
  }
}

/**
 * リフレッシュトークンから新しいトークンペアを生成する
 * @param refreshToken - 有効なリフレッシュトークン
 * @param getUserData - ユーザーIDからユーザー情報を取得する関数
 * @returns 新しいトークンペア
 * @throws リフレッシュトークンが無効またはユーザーが存在しない場合
 */
export async function refreshTokenPair(
  refreshToken: string,
  getUserData: (salesId: number) => Promise<Omit<JWTPayload, 'iat' | 'exp'> | null>
): Promise<TokenPair> {
  // リフレッシュトークンを検証
  const payload = await verifyRefreshToken(refreshToken)

  // ユーザー情報を取得
  const userData = await getUserData(payload.sales_id)

  if (!userData) {
    throw new JWTVerificationError('ユーザーが見つかりません')
  }

  // 新しいトークンペアを生成
  return generateTokenPair(userData)
}
