import { DateTime } from 'luxon'
import { FixtureService } from '../../utils/services/fixtureService'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const zone = 'America/Sao_Paulo'

  const dateStr = (query.date as string | undefined)
    ?? DateTime.now().setZone(zone).toFormat('yyyy-MM-dd')

  const fixtures = await FixtureService.fixturesByDate(dateStr, zone)

  return { fixtures }
})
