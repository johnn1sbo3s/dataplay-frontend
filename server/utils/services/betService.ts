import type { Outcome } from '@prisma/client'
import { prisma } from '../prisma'
import { DateTime } from 'luxon'

interface CreateBetDTO {
  fixtureFqn: string
  modelName: string
  betOdds: number
  isValidationBet: boolean
  outcome?: Outcome
}

export const BetService = {
  async betsByDate(dateStr: string, zone: string = 'America/Sao_Paulo') {
    const day = DateTime.fromISO(dateStr, { zone })

    if (!day.isValid) {
      throw new Error('Invalid date')
    }

    const startOfDay = day.startOf('day').toUTC().toJSDate()
    const endOfDay = day.endOf('day').toUTC().toJSDate()

    return await prisma.bet.findMany({
      where: {
        fixture: {
          date: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      },
      include: {
        fixture: true
      },
      orderBy: {
        fixture: {
          date: 'desc'
        }
      }
    })
  },

  async createMany(data: CreateBetDTO[]) {
    const results = []
    const errors = []

    for (const bet of data) {
      try {
        const saved = await prisma.bet.upsert({
          where: {
            betIdentifier: {
              fixtureFqn: bet.fixtureFqn,
              modelName: bet.modelName
            }
          },
          create: {
            fixtureFqn: bet.fixtureFqn,
            modelName: bet.modelName,
            betOdds: bet.betOdds,
            isValidationBet: bet.isValidationBet,
            outcome: bet.outcome
          },
          update: {
            betOdds: bet.betOdds,
            isValidationBet: bet.isValidationBet,
            outcome: bet.outcome
          }
        })
        results.push(saved)
      } catch (error) {
        console.error(`\nErro ao salvar a aposta: ${bet.fixtureFqn}`, error)
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
