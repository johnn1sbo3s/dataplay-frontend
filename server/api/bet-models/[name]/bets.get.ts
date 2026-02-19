import { BetModelService } from '../../../utils/services/betModelService'
import { DateTime } from 'luxon'

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Parâmetro "name" é obrigatório'
    })
  }

  const query = getQuery(event)
  const zone = 'America/Sao_Paulo'

  const dateStr = (query.date as string | undefined)
    ?? DateTime.now().setZone(zone).toFormat('yyyy-MM-dd')

  const bets = await BetModelService.betsByModel(name, dateStr)

  return { bets }
})
