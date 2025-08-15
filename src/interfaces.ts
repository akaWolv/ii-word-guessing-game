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

type ThemeColorMode = 'light' | 'dark'

export type {
  ThemeColorMode, 
  Word,
  GameInfo
}
