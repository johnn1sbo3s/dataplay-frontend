import { prisma } from '../prisma'

interface CreateOddDTO {
  fixtureFqn: string
  homeOdds: number | null
  drawOdds: number | null
  awayOdds: number | null
  over25Odds?: number | null
  under25Odds?: number | null
  bttsYesOdds?: number | null
  bttsNoOdds?: number | null
  homeClosingOdds?: number | null
  drawClosingOdds?: number | null
  awayClosingOdds?: number | null
}

export const OddService = {
  async index() {
    return await prisma.odds.findMany({
      include: {
        fixture: true
      },
      orderBy: {
        timestamp: 'desc'
      }
    })
  },

  async oddsByFixture(fixtureFqn: string) {
    return await prisma.odds.findMany({
      where: {
        fixtureFqn
      },
      include: {
        fixture: true
      },
      orderBy: {
        timestamp: 'desc'
      }
    })
  },

  async createMany(data: CreateOddDTO[]) {
    const results = []
    const errors = []

    for (const odd of data) {
      try {
        const saved = await prisma.odds.upsert({
          where: {
            fixtureFqn: odd.fixtureFqn
          },
          create: {
            fixtureFqn: odd.fixtureFqn,
            homeOdds: odd.homeOdds,
            drawOdds: odd.drawOdds,
            awayOdds: odd.awayOdds,
            over25Odds: odd.over25Odds,
            under25Odds: odd.under25Odds,
            bttsYesOdds: odd.bttsYesOdds,
            bttsNoOdds: odd.bttsNoOdds,
            homeClosingOdds: odd.homeClosingOdds,
            drawClosingOdds: odd.drawClosingOdds,
            awayClosingOdds: odd.awayClosingOdds
          },
          update: {
            homeOdds: odd.homeOdds,
            drawOdds: odd.drawOdds,
            awayOdds: odd.awayOdds,
            over25Odds: odd.over25Odds,
            under25Odds: odd.under25Odds,
            bttsYesOdds: odd.bttsYesOdds,
            bttsNoOdds: odd.bttsNoOdds,
            homeClosingOdds: odd.homeClosingOdds,
            drawClosingOdds: odd.drawClosingOdds,
            awayClosingOdds: odd.awayClosingOdds
          }
        })
        results.push(saved)
      } catch (error) {
        console.error(`\nErro ao salvar a aposta: ${odd.fixtureFqn}`, error)
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
  }
}
