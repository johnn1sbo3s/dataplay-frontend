import { FixtureService } from "../../utils/services/fixtureService";

export default defineEventHandler(async (event) => {
    return await FixtureService.index()
})
