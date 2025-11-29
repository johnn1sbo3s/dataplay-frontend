import { TeamService } from "../../utils/services/teamService";

export default defineEventHandler(async () => {
    return await TeamService.index()
})