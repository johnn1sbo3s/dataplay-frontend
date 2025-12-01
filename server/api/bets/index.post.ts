import { Outcome } from '@prisma/client'
import { z } from 'zod'
import { BetService } from '../../utils/services/betService'

const betSchema = z.object({
  fixtureFqn: z.string().min(1).max(100),
  modelName: z.string().min(1).max(50),
  isValidationBet: z.boolean(),
  outcome: z.enum([Outcome.WIN, Outcome.DRAW, Outcome.LOSE]).optional()
})

const bodySchema = z.union([betSchema, betSchema.array()])

export default defineEventHandler(async (event) => {
  const authorization = getRequestHeader(event, 'authorization')
  if (authorization !== `Bearer ${process.env.API_SECRET}`) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const validation = bodySchema.safeParse(body)

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dados inválidos',
      data: validation.error?.issues
    })
  }

  const betsPayload = Array.isArray(validation.data)
    ? validation.data
    : [validation.data]

  return await BetService.createMany(betsPayload)
})
