import { FixtureService } from '../../utils/services/fixtureService'

export default defineEventHandler(async () => {
  return await FixtureService.index()
})
