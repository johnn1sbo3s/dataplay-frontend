import { BetService } from '../../utils/services/betService'

export default defineEventHandler(async () => {
  return await BetService.index()
})
