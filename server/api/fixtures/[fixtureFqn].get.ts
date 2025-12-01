import { FixtureService } from '../../utils/services/fixtureService'
import { z } from 'zod'

const fixtureSchema = z.string().min(1).max(50)

export default defineEventHandler(async (event) => {
  const fixtureFqn = getRouterParam(event, 'fixtureFqn')
  const validation = fixtureSchema.safeParse(fixtureFqn)

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Dados inválidos',
      data: validation.error?.issues
    })
  }

  return await FixtureService.show(validation.data)
})
