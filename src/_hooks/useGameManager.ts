import { GameInfo, Word } from 'interfaces'
import { useEffect, useState } from 'react'
import useGameLoaderManager from './useGameLoaderManager'
import useStopwatchManager from './useStopwatchManager'
import { useSelector } from 'react-redux'
import { RootState } from 'stores/stopwatch'

const useGameManager = () => {
  const {
    loadGameWords,
    saveGameWords
  } = useGameLoaderManager()

  const isAnyTimeLeft = useSelector((state: RootState) => state.stopwatch.isAnyTimeLeft)

  const { resumeTimer, stopTimer } = useStopwatchManager()

  const [currentWord, setCurrentWord] = useState<Word | {}>({})
  const [wordList, setWordList] = useState<Word[]>(loadGameWords() || [])
  const [gameInfo, setGameInfo] = useState<GameInfo>({ totalWordsCount: 0, guessedCount: 0, toGuessCount: 0})

  const _getAvailableWords = (): Word[] => wordList.filter(({ isGuessed }) => !isGuessed);

  const _getRandomWord = (): Word => {
    const availableWordsList = _getAvailableWords();
    const randomIndex = Math.floor((Math.random() * availableWordsList.length));
    return availableWordsList[randomIndex] || {} as Word;
  }

  const _calculateStats = () => {
    const totalWordsCount = wordList.length
    const guessedCount = wordList.filter(({ isGuessed }) => isGuessed).length
    const toGuessCount = totalWordsCount - guessedCount;

    if (toGuessCount === 0) {
      stopTimer()
    }

    setGameInfo({
      totalWordsCount,
      guessedCount,
      toGuessCount 
    })
  }

  const setNewRandomWord = () => setCurrentWord(_getRandomWord())
  const pauseGame = () => stopTimer()
  const resumeGame = () => resumeTimer()

  const setCurrentWordAsGuessed = () => {
    const { id: currentWordId } = currentWord as Word
    if (currentWordId) {
      const restOfWords = wordList.filter(({ id }) => id !== currentWordId)
      setWordList([...restOfWords, { ...currentWord, isGuessed: true } as Word])
    }
  }

  useEffect(() => {
    if (!wordList) {
      return;
    }

    saveGameWords(wordList)  
    resumeTimer()
    setNewRandomWord()
    _calculateStats()
  }, [wordList])

  return {
    setNewRandomWord,
    setCurrentWordAsGuessed,
    currentWord: ((): Word => currentWord as Word)(),
    gameInfo: ((): GameInfo => gameInfo as GameInfo)(),
    isGameInProgress: ((): boolean => isAnyTimeLeft && gameInfo.toGuessCount > 0)(),
    pauseGame,
    resumeGame
  }
}


export default useGameManager