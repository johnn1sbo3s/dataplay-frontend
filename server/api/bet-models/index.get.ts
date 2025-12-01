import { BetModelService } from '../../utils/services/betModelService'

export default defineEventHandler(async () => {
  return await BetModelService.index()
})
