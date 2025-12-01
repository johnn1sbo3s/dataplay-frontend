import { prisma } from "../prisma"

interface CreateBetModelDTO {
    name: string
    isActive: boolean
}

export const BetModelService = {
    async index() {
        return await prisma.betModel.findMany()
    },

    async create(data: CreateBetModelDTO[]) {
        const results = []
        const errors = []

        for (const model of data) {
            try {
                const saved = await prisma.betModel.upsert({
                    where: {
                        name: model.name
                    },
                    update: {
                        isActive: model.isActive
                    },
                    create: {
                        name: model.name,
                        isActive: model.isActive
                    }
                })
                results.push(saved)
            } catch (error) {
                console.error(`\nErro ao salvar o modelo: ${model.name}`, error)
                errors.push(error)
            }
        }

        return {
            success: true,
            process: results.length,
            failed: errors.length,
            results,
            errors
        }
    }
}