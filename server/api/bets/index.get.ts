import { BetService } from '../../utils/services/betService'
import { DateTime } from 'luxon'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const zone = 'America/Sao_Paulo'

  const dateStr = (query.date as string | undefined)
    ?? DateTime.now().setZone(zone).toFormat('yyyy-MM-dd')

  const bets = await BetService.betsByDate(dateStr)

  return { bets }
})
