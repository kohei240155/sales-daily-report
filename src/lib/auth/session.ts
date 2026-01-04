import { cookies } from 'next/headers'

import { type JWTPayload, verifyToken } from './jwt'

/**
 * 現在のユーザーセッションを取得する
 * @returns ユーザー情報またはnull（未認証の場合）
 */
export async function getCurrentUser(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    const payload = await verifyToken(token)
    return payload
  } catch (error) {
    console.error('Session verification error:', error)
    return null
  }
}

/**
 * 認証が必要なページで使用する
 * 未認証の場合は例外をスローする
 */
export async function requireAuth(): Promise<JWTPayload> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}
