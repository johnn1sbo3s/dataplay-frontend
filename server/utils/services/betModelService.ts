import type { BetType } from '@prisma/client'
import { prisma } from '../prisma'

interface CreateBetModelDTO {
  name: string
  betType: BetType
  isActive: boolean
}

export const BetModelService = {
  async index() {
    return await prisma.betModel.findMany()
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
