type GameInfo = {
  totalWordsCount: number  
  guessedCount: number
  toGuessCount: number
}

type Word = {
  id: string  
  text: string
  description: string
  isGuessed: boolean
}

type GameSetupOption = {
  name: string  
  value: string
  type: string
  order: number
}

type GameSetup = {
  availableCategories: GameSetupOption[]
  availableWordListSizes: GameSetupOption[]
  availableTimes: GameSetupOption[]
}

type ThemeColorMode = 'light' | 'dark'

export type {
  ThemeColorMode, 
  Word,
  GameInfo,
  GameSetupOption,
  GameSetup
}
