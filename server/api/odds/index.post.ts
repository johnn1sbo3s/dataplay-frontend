import { OddService } from '../../utils/services/oddService'
import { z } from 'zod'

const oddSchema = z.object({
  fixtureFqn: z.string().min(1).max(100),
  homeOdds: z.number().min(1).max(1000).nullable(),
  drawOdds: z.number().min(1).max(1000).nullable(),
  awayOdds: z.number().min(1).max(1000).nullable(),
  over25Odds: z.number().min(1).max(1000).nullable(),
  under25Odds: z.number().min(1).max(1000).nullable(),
  bttsYesOdds: z.number().min(1).max(1000).nullable(),
  bttsNoOdds: z.number().min(1).max(1000).nullable(),
  homeClosingOdds: z.number().min(1).max(1000).nullable(),
  drawClosingOdds: z.number().min(1).max(1000).nullable(),
  awayClosingOdds: z.number().min(1).max(1000).nullable()
})

const bodySchema = z.union([oddSchema, oddSchema.array()])

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

  const oddsPayload = Array.isArray(validation.data)
    ? validation.data
    : [validation.data]

  return await OddService.createMany(oddsPayload)
})
