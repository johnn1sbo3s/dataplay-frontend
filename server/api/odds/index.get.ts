import { OddService } from '../../utils/services/oddService'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (query.fixtureFqn) {
    return await OddService.oddsByFixture(query.fixtureFqn as string)
  }

  return await OddService.index()
})
