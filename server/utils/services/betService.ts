import type { Outcome } from '@prisma/client'
import { prisma } from '../prisma'

interface CreateBetDTO {
  fixtureFqn: string
  modelName: string
  isValidationBet: boolean
  outcome?: Outcome
}

export const BetService = {
  async index() {
    return await prisma.bet.findMany()
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
            isValidationBet: bet.isValidationBet,
            outcome: bet.outcome
          },
          update: {
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
