import { TeamService } from "../../utils/services/teamService";

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event)
    if (headers['authorization'] !== `Bearer ${process.env.API_SECRET}`) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }

    const teamFqn = getRouterParam(event, 'teamFqn') as string

    return await TeamService.delete(teamFqn)
})