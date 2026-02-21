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

  if (!query.initialDate || !query.finalDate) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetros "initialDate" e "finalDate" são obrigatórios'
    })
  }

  const initialDateStr = query.initialDate as string
  const finalDateStr = query.finalDate as string

  const metrics = await BetModelService.metrics(name, initialDateStr, finalDateStr)

  return { metrics }
})
