import { TeamService } from '../../utils/services/teamService'

export default defineEventHandler(async (event) => {
  const teamFqn = getRouterParam(event, 'teamFqn') as string

  return await TeamService.show(teamFqn)
})
