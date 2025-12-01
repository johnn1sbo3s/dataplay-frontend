import { BetModelService } from "../../utils/services/betModelService"
import { z } from 'zod'

const betModelSchema = z.object({
    name: z.string().min(1).max(50),
    isActive: z.boolean().default(true)
})

const bodySchema = z.union([betModelSchema, betModelSchema.array()])

export default defineEventHandler(async (event) => {
    const authorization = getRequestHeader(event, 'authorization')
    if (authorization !== `Bearer ${process.env.API_SECRET}`) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const body = await readBody(event)
    const validation = bodySchema.safeParse(body)

    if (!validation.success) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Dados inválidos',
            data: validation.error?.issues
        })
    }

    const betModelsPayload = Array.isArray(validation.data)
        ? validation.data
        : [validation.data]

    return await BetModelService.create(betModelsPayload)
})