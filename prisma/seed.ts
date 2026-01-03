import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  console.log('Start seeding...')

  // パスワードのハッシュ化
  const hashedPassword = await bcrypt.hash('Test1234!', 10)

  // 営業担当者の作成
  const admin = await prisma.sales.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      name: '管理者太郎',
      email: 'admin@test.com',
      password: hashedPassword,
      department: '管理部',
      position: '部長',
    },
  })

  const manager = await prisma.sales.upsert({
    where: { email: 'manager@test.com' },
    update: {},
    create: {
      name: '上長花子',
      email: 'manager@test.com',
      password: hashedPassword,
      department: '営業部',
      position: '課長',
    },
  })

  const sales1 = await prisma.sales.upsert({
    where: { email: 'sales1@test.com' },
    update: {},
    create: {
      name: '山田太郎',
      email: 'sales1@test.com',
      password: hashedPassword,
      department: '営業部',
      position: '一般',
    },
  })

  const sales2 = await prisma.sales.upsert({
    where: { email: 'sales2@test.com' },
    update: {},
    create: {
      name: '鈴木花子',
      email: 'sales2@test.com',
      password: hashedPassword,
      department: '営業部',
      position: '一般',
    },
  })

  console.log('Created sales:', { admin, manager, sales1, sales2 })

  // 顧客の作成
  const customer1 = await prisma.customer.upsert({
    where: { id: 1 },
    update: {},
    create: {
      customerName: '佐藤一郎',
      companyName: '株式会社ABC',
      phone: '03-1234-5678',
      email: 'sato@abc.co.jp',
      address: '東京都千代田区丸の内1-1-1',
    },
  })

  const customer2 = await prisma.customer.upsert({
    where: { id: 2 },
    update: {},
    create: {
      customerName: '高橋花子',
      companyName: 'XYZ商事株式会社',
      phone: '03-9876-5432',
      email: 'takahashi@xyz.co.jp',
      address: '東京都港区六本木1-1-1',
    },
  })

  const customer3 = await prisma.customer.upsert({
    where: { id: 3 },
    update: {},
    create: {
      customerName: '田中次郎',
      companyName: '有限会社DEF',
      phone: '03-5555-6666',
      email: 'tanaka@def.co.jp',
      address: '東京都新宿区新宿1-1-1',
    },
  })

  console.log('Created customers:', { customer1, customer2, customer3 })

  // サンプル日報の作成
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const report1 = await prisma.dailyReport.create({
    data: {
      salesId: sales1.id,
      reportDate: today,
      problem: '新規顧客の開拓が思うように進んでいない',
      plan: '既存顧客へのフォローアップと紹介依頼を実施',
      visitRecords: {
        create: [
          {
            customerId: customer1.id,
            visitTime: '10:00',
            visitContent: '新商品の提案を実施。前向きな反応あり',
          },
          {
            customerId: customer2.id,
            visitTime: '14:00',
            visitContent: '契約更新の打ち合わせ。条件交渉中',
          },
        ],
      },
    },
  })

  console.log('Created daily report:', report1)

  // サンプルコメントの作成
  const comment1 = await prisma.comment.create({
    data: {
      reportId: report1.id,
      salesId: manager.id,
      commentContent: '新規開拓については来週ミーティングで相談しましょう',
    },
  })

  console.log('Created comment:', comment1)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
