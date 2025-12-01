import { BetModelService } from "../../utils/services/betModelService"

export default defineEventHandler(async (event) => {
    return await BetModelService.index()
})