import { FixtureService } from '../../../utils/services/fixtureService'
import { z } from 'zod'

const fixtureSchema = z.array(
  z.string().min(1).max(50)
)

export default defineEventHandler(async (event) => {
  const header = getRequestHeaders(event)
  if (header['authorization'] !== `Bearer ${process.env.API_SECRET}`) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const body = await readBody(event)
  const validation = fixtureSchema.safeParse(body)

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dados inválidos',
      data: validation.error?.issues
    })
  }

  return await FixtureService.deleteByFixtureFqn(validation.data)
})
