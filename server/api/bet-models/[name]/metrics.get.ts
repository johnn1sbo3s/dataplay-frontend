import { BetModelService } from '../../../utils/services/betModelService'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetro "name" é obrigatório'
    })
  }

  const query = getQuery(event)

  const initialDateStr = (query.initialDate as string | undefined)
    ?? '2020-01-01'

  const finalDateStr = (query.finalDate as string | undefined)
    ?? '2500-01-01'

  const results = await BetModelService.metrics(name, initialDateStr, finalDateStr)

  return { results }
})
