/**
 * 日付操作ユーティリティ
 * date-fnsを使用した日付フォーマット、パース、計算などの共通関数を提供
 */

import {
  format,
  parseISO,
  isValid,
  startOfDay,
  endOfDay,
  addDays,
  subDays,
  differenceInDays,
  isBefore,
  isAfter,
  isSameDay,
} from 'date-fns'
import { ja } from 'date-fns/locale'

/**
 * デフォルトロケール（日本語）
 */
const DEFAULT_LOCALE = ja

/**
 * 日付を YYYY/MM/DD 形式でフォーマット
 * @param date - フォーマットする日付
 * @returns YYYY/MM/DD形式の文字列
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    throw new Error('Invalid date')
  }
  return format(dateObj, 'yyyy/MM/dd', { locale: DEFAULT_LOCALE })
}

/**
 * 日付時刻を YYYY/MM/DD HH:MM 形式でフォーマット
 * @param date - フォーマットする日付時刻
 * @returns YYYY/MM/DD HH:MM形式の文字列
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    throw new Error('Invalid date')
  }
  return format(dateObj, 'yyyy/MM/dd HH:mm', { locale: DEFAULT_LOCALE })
}

/**
 * 日付を YYYY-MM-DD 形式でフォーマット（API送信用）
 * @param date - フォーマットする日付
 * @returns YYYY-MM-DD形式の文字列
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    throw new Error('Invalid date')
  }
  return format(dateObj, 'yyyy-MM-dd')
}

/**
 * 時刻を HH:MM 形式でフォーマット
 * @param date - フォーマットする日付時刻
 * @returns HH:MM形式の文字列
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    throw new Error('Invalid date')
  }
  return format(dateObj, 'HH:mm')
}

/**
 * 日付を完全な形式でフォーマット（例: 2026年1月2日（木））
 * @param date - フォーマットする日付
 * @returns フォーマットされた日本語の日付文字列
 */
export function formatDateFull(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) {
    throw new Error('Invalid date')
  }
  return format(dateObj, 'yyyy年M月d日(E)', { locale: DEFAULT_LOCALE })
}

/**
 * ISO 8601形式の文字列を Date オブジェクトにパース
 * @param dateString - ISO 8601形式の日付文字列
 * @returns Dateオブジェクト
 */
export function parseDateISO(dateString: string): Date {
  const date = parseISO(dateString)
  if (!isValid(date)) {
    throw new Error('Invalid date string')
  }
  return date
}

/**
 * 日付が有効かチェック
 * @param date - チェックする日付
 * @returns 有効な日付の場合true
 */
export function isValidDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isValid(dateObj)
}

/**
 * 今日の日付を取得
 * @returns 今日の日付（時刻は00:00:00）
 */
export function getToday(): Date {
  return startOfDay(new Date())
}

/**
 * 今日の日付を YYYY-MM-DD 形式で取得
 * @returns 今日の日付（YYYY-MM-DD形式）
 */
export function getTodayISO(): string {
  return formatDateISO(getToday())
}

/**
 * 日付の開始時刻を取得（00:00:00）
 * @param date - 対象の日付
 * @returns その日の開始時刻
 */
export function getStartOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return startOfDay(dateObj)
}

/**
 * 日付の終了時刻を取得（23:59:59）
 * @param date - 対象の日付
 * @returns その日の終了時刻
 */
export function getEndOfDay(date: Date | string): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return endOfDay(dateObj)
}

/**
 * 指定日数後の日付を取得
 * @param date - 基準となる日付
 * @param days - 加算する日数
 * @returns 計算後の日付
 */
export function addDaysToDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return addDays(dateObj, days)
}

/**
 * 指定日数前の日付を取得
 * @param date - 基準となる日付
 * @param days - 減算する日数
 * @returns 計算後の日付
 */
export function subtractDaysFromDate(date: Date | string, days: number): Date {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return subDays(dateObj, days)
}

/**
 * 2つの日付の差（日数）を計算
 * @param dateLeft - 比較する日付1
 * @param dateRight - 比較する日付2
 * @returns 日数の差
 */
export function getDaysDifference(
  dateLeft: Date | string,
  dateRight: Date | string
): number {
  const leftObj = typeof dateLeft === 'string' ? parseISO(dateLeft) : dateLeft
  const rightObj = typeof dateRight === 'string' ? parseISO(dateRight) : dateRight
  return differenceInDays(leftObj, rightObj)
}

/**
 * 日付が過去かチェック
 * @param date - チェックする日付
 * @returns 過去の日付の場合true
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isBefore(dateObj, getToday())
}

/**
 * 日付が未来かチェック
 * @param date - チェックする日付
 * @returns 未来の日付の場合true
 */
export function isFutureDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return isAfter(dateObj, getToday())
}

/**
 * 2つの日付が同じ日かチェック
 * @param dateLeft - 比較する日付1
 * @param dateRight - 比較する日付2
 * @returns 同じ日の場合true
 */
export function isSameDateAs(
  dateLeft: Date | string,
  dateRight: Date | string
): boolean {
  const leftObj = typeof dateLeft === 'string' ? parseISO(dateLeft) : dateLeft
  const rightObj = typeof dateRight === 'string' ? parseISO(dateRight) : dateRight
  return isSameDay(leftObj, rightObj)
}

/**
 * 日付が今日かチェック
 * @param date - チェックする日付
 * @returns 今日の場合true
 */
export function isToday(date: Date | string): boolean {
  return isSameDateAs(date, getToday())
}
