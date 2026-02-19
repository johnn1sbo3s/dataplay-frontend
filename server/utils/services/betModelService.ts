import type { BetType } from '@prisma/client'
import { prisma } from '../prisma'
import { DateTime } from 'luxon'

interface CreateBetModelDTO {
  name: string
  betType: BetType
  isActive: boolean
}

export const BetModelService = {
  async index() {
    return await prisma.betModel.findMany()
  },

  async betsByModel(name: string, dateStr: string = '2020-01-01', zone: string = 'America/Sao_Paulo') {
    const day = DateTime.fromISO(dateStr, { zone })

    const startOfDay = day.startOf('day').toUTC().toJSDate()
    const endOfDay = day.endOf('day').toUTC().toJSDate()

    return await prisma.bet.findMany({
      where: {
        modelName: name,
        fixture: {
          date: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      },
      include: {
        fixture: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  },

  async create(data: CreateBetModelDTO[]) {
    const results = []
    const errors = []

    for (const model of data) {
      try {
        const saved = await prisma.betModel.upsert({
          where: {
            name: model.name
          },
          update: {
            betType: model.betType,
            isActive: model.isActive
          },
          create: {
            name: model.name,
            betType: model.betType,
            isActive: model.isActive
          }
        })
        results.push(saved)
      } catch (error) {
        console.error(`\nErro ao salvar o modelo: ${model.name}`, error)
        errors.push(error)
      }
    }

    return {
      success: true,
      processed: results.length,
      failed: errors.length,
      results,
      errors
    }
  }
}
