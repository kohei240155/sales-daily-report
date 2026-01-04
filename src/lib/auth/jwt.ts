import { SignJWT, jwtVerify } from 'jose'

/**
 * JWTペイロードの型定義
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
 * JWTトークンを生成する
 * @param payload - トークンに含めるペイロード情報
 * @returns 署名済みのJWTトークン
 */
export async function signToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  const token = await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '24h')
    .sign(secret)

  return token
}

/**
 * JWTトークンを検証・復号する
 * @param token - 検証するJWTトークン
 * @returns デコードされたペイロード
 * @throws トークンが無効または期限切れの場合
 */
export async function verifyToken(token: string): Promise<JWTPayload> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JWTPayload
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Token verification failed: ${error.message}`)
    }
    throw new Error('Token verification failed')
  }
}
