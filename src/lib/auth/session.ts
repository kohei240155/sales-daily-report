// src/lib/auth/session.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from './jwt'

export interface User {
  sales_id: number
  email: string
  department: string
  position: string
}

/**
 * 現在のログインユーザー情報を取得する
 * @returns ユーザー情報、または未認証の場合はnull
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    const payload = await verifyToken(token)

    return {
      sales_id: payload.sales_id as number,
      email: payload.email as string,
      department: payload.department as string,
      position: payload.position as string,
    }
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}

/**
 * 認証が必要なページで使用する
 * 未認証の場合はログインページにリダイレクト
 * @returns ユーザー情報
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

/**
 * ユーザーが管理者権限を持つかチェックする
 * @param user ユーザー情報
 * @returns 管理者の場合true
 */
export function isAdmin(user: User): boolean {
  // 役職が「部長」または「管理者」の場合に管理者とみなす
  return user.position === '部長' || user.position === '管理者'
}

/**
 * ユーザーが上長権限を持つかチェックする
 * @param user ユーザー情報
 * @returns 上長の場合true
 */
export function isManager(user: User): boolean {
  // 役職が「課長」「部長」「管理者」の場合に上長とみなす
  return (
    user.position === '課長' ||
    user.position === '部長' ||
    user.position === '管理者'
  )
}
