import type { AvatarProps } from '@nuxt/ui'

export interface NavigationItem {
  value: 'dashboard' | 'fixtures' | 'bets' | 'bet-models'
  label: string
  icon: string
  to: string
  onSelect?: () => void
}

export interface Team {
  teamFqn: string
  name: string
}

export interface BetModel {
  id: number
  name: string
  betType: BetType
  isActive: boolean
}

export interface ChartItem {
  betNumber: number
  date: string
  profit: number
  cumulativeProfit: number
  outcome: string
}

export interface MetricsByModelResponse {
  modelName: string
  totalProfit: number
  yield: number
  avgOdds: number
  totalBets: number
  winRate: number
  chartData: ChartItem[]
}

export interface Odds {
  homeOdds: number
  drawOdds: number
  awayOdds: number
  over25Odds: number
  under25Odds: number
  bttsYesOdds: number
  bttsNoOdds: number
  homeClosingOdds: number | null
  drawClosingOdds: number | null
  awayClosingOdds: number | null
}

export interface Bet {
  id: number
  fixtureFqn: string
  modelName: string
  betOdds: number
  fixture: Fixture
  model: BetModel
  outcome?: string
}

export interface Fixture {
  fixtureFqn: string
  flashscoreId: string
  date: string | Date
  league: string
  homeTeam: Team
  awayTeam: Team
  scoreHomeFt: number | null
  scoreAwayFt: number | null
  scoreHomeHt: number | null
  scoreAwayHt: number | null
  odds: Odds[]
  bets: Bet[]
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: AvatarProps
  status: UserStatus
  location: string
}

export interface Mail {
  id: number
  unread?: boolean
  from: User
  subject: string
  body: string
  date: string
}

export interface Member {
  name: string
  username: string
  role: 'member' | 'owner'
  avatar: AvatarProps
}

export interface Stat {
  title: string
  icon: string
  value: number | string
  variation: number
  formatter?: (value: number) => string
}

export interface Sale {
  id: string
  date: string
  status: SaleStatus
  email: string
  amount: number
}

export interface Notification {
  id: number
  unread?: boolean
  sender: User
  body: string
  date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
  start: Date
  end: Date
}
