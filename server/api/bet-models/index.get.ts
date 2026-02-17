import { BetModelService } from '../../utils/services/betModelService'

export default defineEventHandler(async () => {
  const betModels = await BetModelService.index()

  return { betModels }
})
