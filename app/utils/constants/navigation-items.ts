import type { NavigationItem } from '~/types'

const closeSidebar = () => {
  const showSidebar = useState('showSidebar')
  showSidebar.value = false
}

export function navigationItems(): NavigationItem[] {
  return [
    {
      value: 'dashboard',
      label: 'Dashboard',
      icon: 'i-lucide-home',
      to: '/',
      onSelect: closeSidebar
    },
    {
      value: 'fixtures',
      label: 'Jogos',
      icon: 'i-lucide-calendar-range',
      to: '/fixtures',
      onSelect: closeSidebar
    },
    {
      value: 'bets',
      label: 'Apostas',
      icon: 'i-lucide-dices',
      to: '/bets',
      onSelect: closeSidebar
    },
    {
      value: 'bet-models',
      label: 'Modelos',
      icon: 'i-lucide-sparkles',
      to: '/bet-models',
      onSelect: closeSidebar
    }
  ]
}
