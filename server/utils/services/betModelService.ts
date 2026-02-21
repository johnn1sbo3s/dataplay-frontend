import type { BetType, Bet } from '@prisma/client'
import { prisma } from '../prisma'
import { DateTime } from 'luxon'

interface CreateBetModelDTO {
  name: string
  betType: BetType
  isActive: boolean
}

function calculateProfitBack(bets: Bet[]) {
  return bets.reduce((total, bet) => {
    if (bet.outcome === 'WIN') return total + (bet.betOdds - 1)
    if (bet.outcome === 'LOSE') return total - 1
    return total
  }, 0)
}

function calculateProfitLay(bets: Bet[]) {
  return bets.reduce((total, bet) => {
    const convertedOdds = 1 / (bet.betOdds - 1)
    if (bet.outcome === 'WIN') return total + 0.97 * convertedOdds
    if (bet.outcome === 'LOSE') return total - 1
    return total
  }, 0)
}

function calculateSingleBetProfit(bet: Bet, betType: BetType): number {
  if (bet.outcome === 'DRAW') return 0

  if (betType === 'BACK') {
    if (bet.outcome === 'WIN') return bet.betOdds - 1
    if (bet.outcome === 'LOSE') return -1
  } else {
    const convertedOdds = 1 / (bet.betOdds - 1)
    if (bet.outcome === 'WIN') return 0.97 * convertedOdds
    if (bet.outcome === 'LOSE') return -1
  }

  return 0
}

export const BetModelService = {
  async index() {
    return await prisma.betModel.findMany({
      orderBy: {
        name: 'asc'
      }
    })
  },

  async betsByModel(name: string, dateStr: string = '2020-01-01', zone: string = 'America/Sao_Paulo') {
    const day = DateTime.fromISO(dateStr, { zone })

    const startOfDay = day.startOf('day').toUTC().toJSDate()
    const endOfDay = day.endOf('day').toUTC().toJSDate()

    return await prisma.bet.findMany({
      where: {
        modelName: name,
        fixture: {
          date: {
            gte: startOfDay,
            lt: endOfDay
          }
        }
      },
      include: {
        fixture: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  },

  async metrics(name: string, initialDate: string, finalDate: string) {
    const initialDay = DateTime.fromISO(initialDate, { zone: 'America/Sao_Paulo' })
    const finalDay = DateTime.fromISO(finalDate, { zone: 'America/Sao_Paulo' })
    const startOfDay = initialDay.startOf('day').toUTC().toJSDate()
    const endOfFinalDay = finalDay.endOf('day').toUTC().toJSDate()

    const betModel = await prisma.betModel.findUnique({
      where: {
        name,
        isActive: true
      },
      select: {
        betType: true,
        name: true,
        bets: {
          where: {
            isValidationBet: false,
            outcome: {
              not: 'DRAW'
            },
            fixture: {
              date: {
                gte: startOfDay,
                lt: endOfFinalDay
              }
            }
          },
          include: {
            fixture: {
              select: {
                date: true
              }
            }
          }
        }
      }
    })

    if (!betModel) {
      throw new Error('Modelo não encontrado')
    }

    const totalProfit = betModel.betType === 'BACK'
      ? calculateProfitBack(betModel.bets)
      : calculateProfitLay(betModel.bets)

    const yieldValue = (totalProfit / betModel.bets.length).toFixed(4)
    const avgOdds = (betModel.bets.reduce((total, bet) => total + bet.betOdds, 0) / betModel.bets.length).toFixed(2)
    const totalBets = betModel.bets.length
    const winRate = (betModel.bets.filter(bet => bet.outcome === 'WIN').length / totalBets).toFixed(4)

    const sortedBets = [...betModel.bets].sort((a, b) =>
      a.fixture.date.getTime() - b.fixture.date.getTime()
    )

    let cumulativeProfit = 0
    const chartData = sortedBets.map((bet, index) => {
      const profit = calculateSingleBetProfit(bet, betModel.betType)
      cumulativeProfit += profit

      return {
        betNumber: index + 1,
        date: DateTime.fromJSDate(bet.fixture.date).setZone('America/Sao_Paulo').toISODate(),
        profit: Number(profit.toFixed(2)),
        cumulativeProfit: Number(cumulativeProfit.toFixed(2)),
        outcome: bet.outcome
      }
    })

    return {
      modelName: betModel.name,
      totalProfit: Number(totalProfit.toFixed(2)),
      yield: Number(yieldValue),
      avgOdds: Number(avgOdds),
      totalBets,
      winRate: Number(winRate),
      chartData
    }
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
            betType: model.betType,
            isActive: model.isActive
          },
          create: {
            name: model.name,
            betType: model.betType,
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
      processed: results.length,
      failed: errors.length,
      results,
      errors
    }
  }
}
