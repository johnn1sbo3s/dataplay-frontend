import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FixtureService } from '../../../../server/utils/services/fixtureService'
import { prisma } from '../../../../server/utils/prisma'

// Mock do Prisma
// Precisamos mockar o módulo que exporta o prisma client
vi.mock('../../../../server/utils/prisma', () => ({
    prisma: {
        fixture: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            upsert: vi.fn(),
            deleteMany: vi.fn(),
        },
    },
}))

describe('FixtureService', () => {
    const mockFixtures = [
        {
            fixtureFqn: 'match1',
            date: '2025-11-29T16:00:00.000Z',
            league: 'league1',
            homeTeamFqn: 'teamA',
            awayTeamFqn: 'teamB',
            scoreHomeFt: 2,
            scoreAwayFt: 1,
            scoreHomeHt: 1,
            scoreAwayHt: 1,
        },
        {
            fixtureFqn: 'match2',
            date: '2025-11-29T17:00:00.000Z',
            league: 'league2',
            homeTeamFqn: 'teamC',
            awayTeamFqn: 'teamD',
            scoreHomeFt: 2,
            scoreAwayFt: 0,
            scoreHomeHt: 0,
            scoreAwayHt: 0,
        },
        {
            fixtureFqn: 'match3',
            date: '2025-11-29T18:00:00.000Z',
            league: 'league3',
            homeTeamFqn: 'teamE',
            awayTeamFqn: 'teamF',
            scoreHomeFt: null,
            scoreAwayFt: null,
            scoreHomeHt: null,
            scoreAwayHt: null,
        }
    ]

    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('index', () => {
        it('should return all fixtures', async () => {
            // Configura o mock para retornar os dados de teste
            // @ts-ignore
            prisma.fixture.findMany.mockResolvedValue(mockFixtures)

            const result = await FixtureService.index()

            expect(prisma.fixture.findMany).toHaveBeenCalled()
            expect(result).toEqual(mockFixtures)
        })
    })

    describe('show', () => {
        it('should return a specific fixture by FQN', async () => {
            // @ts-ignore
            prisma.fixture.findUnique.mockResolvedValue(mockFixtures[2])

            const result = await FixtureService.show('match1')
            expect(result).toEqual(
                {
                    fixtureFqn: 'match3',
                    date: '2025-11-29T18:00:00.000Z',
                    league: 'league3',
                    homeTeamFqn: 'teamE',
                    awayTeamFqn: 'teamF',
                    scoreHomeFt: null,
                    scoreAwayFt: null,
                    scoreHomeHt: null,
                    scoreAwayHt: null,
                }
            )
        })
    })
})
