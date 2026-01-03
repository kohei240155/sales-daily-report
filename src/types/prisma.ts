import type { Prisma } from '@prisma/client'

// Sales型
export type Sales = Prisma.SalesGetPayload<object>
export type SalesWithRelations = Prisma.SalesGetPayload<{
  include: {
    dailyReports: true
    comments: true
  }
}>

// Customer型
export type Customer = Prisma.CustomerGetPayload<object>
export type CustomerWithVisitRecords = Prisma.CustomerGetPayload<{
  include: {
    visitRecords: true
  }
}>

// DailyReport型
export type DailyReport = Prisma.DailyReportGetPayload<object>
export type DailyReportWithRelations = Prisma.DailyReportGetPayload<{
  include: {
    sales: true
    visitRecords: {
      include: {
        customer: true
      }
    }
    comments: {
      include: {
        sales: true
      }
    }
  }
}>

// VisitRecord型
export type VisitRecord = Prisma.VisitRecordGetPayload<object>
export type VisitRecordWithRelations = Prisma.VisitRecordGetPayload<{
  include: {
    dailyReport: true
    customer: true
  }
}>

// Comment型
export type Comment = Prisma.CommentGetPayload<object>
export type CommentWithRelations = Prisma.CommentGetPayload<{
  include: {
    dailyReport: true
    sales: true
  }
}>

// 日報作成時の入力型
export type CreateDailyReportInput = Omit<
  Prisma.DailyReportCreateInput,
  'sales' | 'visitRecords' | 'comments'
> & {
  salesId: number
  visitRecords: Array<{
    customerId: number
    visitTime?: string
    visitContent: string
  }>
}

// 日報更新時の入力型
export type UpdateDailyReportInput = Partial<CreateDailyReportInput>
