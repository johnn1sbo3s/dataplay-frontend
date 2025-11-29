import { prisma } from "../prisma"

interface TeamDTO {
    teamFqn: string
    name: string
}

export const TeamService = {
    async index() {
        return await prisma.team.findMany()
    },

    async show(teamFqn: string) {
        return await prisma.team.findUniqueOrThrow({
            where: {
                teamFqn
            }
        })
    },

    async createMany(teams: TeamDTO[]) {
        const results = []
        const errors = []

        for (const team of teams) {
            try {
                const saved = await prisma.team.upsert({
                    where: {
                        teamFqn: team.teamFqn
                    },
                    update: {
                        name: team.name
                    },
                    create: {
                        teamFqn: team.teamFqn,
                        name: team.name
                    }
                })
                results.push(saved)
            } catch (error) {
                console.error(`\nErro ao salvar o time: ${team.teamFqn}`, error)
                errors.push(error)
            }
        }

        return {
            success: true,
            processed: results.length,
            failed: errors.length,
            results,
            errors
        }
    },

    async delete(teamFqn: string) {
        try {
            await prisma.team.delete({
                where: {
                    teamFqn
                }
            })

            return { success: true }
        } catch (error) {
            console.error(`\nErro ao deletar o time: ${teamFqn}`, error)
            return { error }
        }
    }
}
