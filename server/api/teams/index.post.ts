import { z } from "zod"
import { TeamService } from "../../utils/services/teamService"

const teamSchema = z.object({
    teamFqn: z.string().min(1).max(50),
    name: z.string().min(1).max(50)
})

const bodySchema = z.union([teamSchema, teamSchema.array()])

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event)
    if (headers['authorization'] !== `Bearer ${process.env.API_SECRET}`) {
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

    const teamsPayload = Array.isArray(validation.data)
        ? validation.data
        : [validation.data]

    return await TeamService.createMany(teamsPayload)
})