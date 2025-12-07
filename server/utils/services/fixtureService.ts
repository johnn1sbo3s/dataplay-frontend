import { DateTime } from 'luxon'
import { prisma } from '../prisma'

interface CreateFixtureDTO {
  fixtureFqn: string
  flashscoreId: string | null
  date: string | Date
  league: string
  homeTeamFqn: string
  awayTeamFqn: string
  scoreHomeFt: number | null
  scoreAwayFt: number | null
  scoreHomeHt: number | null
  scoreAwayHt: number | null
}

export const FixtureService = {
  async fixturesByDate(dateStr: string, zone: string = 'America/Sao_Paulo') {
    const day = DateTime.fromISO(dateStr, { zone })

    if (!day.isValid) {
      throw new Error('Invalid date')
    }

    const startOfDay = day.startOf('day').toUTC().toJSDate()
    const endOfDay = day.endOf('day').toUTC().toJSDate()

    return await prisma.fixture.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      },
      orderBy: {
        date: 'asc'
      }
    })
  },

  async show(fixtureFqn: string) {
    return await prisma.fixture.findUniqueOrThrow({
      where: {
        fixtureFqn
      }
    })
  },

  async createMany(fixtures: CreateFixtureDTO[]) {
    const results = []
    const errors = []

    for (const fixture of fixtures) {
      try {
        const saved = await prisma.fixture.upsert({
          where: {
            fixtureFqn: fixture.fixtureFqn
          },
          update: {
            flashscoreId: fixture.flashscoreId,
            date: fixture.date,
            league: fixture.league,
            homeTeamFqn: fixture.homeTeamFqn,
            awayTeamFqn: fixture.awayTeamFqn,
            scoreHomeFt: fixture.scoreHomeFt,
            scoreAwayFt: fixture.scoreAwayFt,
            scoreHomeHt: fixture.scoreHomeHt,
            scoreAwayHt: fixture.scoreAwayHt
          },
          create: {
            flashscoreId: fixture.flashscoreId,
            fixtureFqn: fixture.fixtureFqn,
            date: fixture.date,
            league: fixture.league,
            homeTeamFqn: fixture.homeTeamFqn,
            awayTeamFqn: fixture.awayTeamFqn,
            scoreHomeFt: fixture.scoreHomeFt,
            scoreAwayFt: fixture.scoreAwayFt,
            scoreHomeHt: fixture.scoreHomeHt,
            scoreAwayHt: fixture.scoreAwayHt
          }
        })
        results.push(saved)
      } catch (error) {
        console.error(`\nErro ao salvar a partida: ${fixture.fixtureFqn}`, error)
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

  async deleteByFixtureFqn(fixtureFqnList: string[]) {
    try {
      await prisma.fixture.deleteMany({
        where: {
          fixtureFqn: {
            in: fixtureFqnList
          }
        }
      })

      return { success: true }
    } catch (error) {
      console.error(`Erro ao deletar as partidas: ${fixtureFqnList}`, error)
      return { error }
    }
  }
}
