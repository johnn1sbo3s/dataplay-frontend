import { FixtureService } from "../../utils/services/fixtureService"
import { z } from 'zod'

const fixtureSchema = z.object({
    flashscoreId: z.string().min(1).max(50).nullable(),
    fixtureFqn: z.string().min(1).max(100),
    date: z.string().min(1).max(50),
    league: z.string().min(1).max(100),
    homeTeamFqn: z.string().min(1).max(50),
    awayTeamFqn: z.string().min(1).max(50),
    scoreHomeFt: z.number().nullable(),
    scoreAwayFt: z.number().nullable(),
    scoreHomeHt: z.number().nullable(),
    scoreAwayHt: z.number().nullable()
})

const bodySchema = z.union([fixtureSchema, fixtureSchema.array()])

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

    const fixturesPayload = Array.isArray(validation.data)
        ? validation.data
        : [validation.data]

    return await FixtureService.createMany(fixturesPayload)
})