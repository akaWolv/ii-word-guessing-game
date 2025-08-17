import { useState } from 'react'
import Cookie from 'js-cookie'
// import {default as WordsDB} from 'constants/Words'
import { Word } from 'interfaces'
import axios from 'axios'

const GAME_WORDS_COOKIE = 'game-words'
const GAME_PARAMS_COOKIE = 'game-params'

const useGameLoaderManager = () => {
  const [isNewGameInitialized, setIsNewGameInitialized] = useState<boolean>(false)

  const _createNewShuffledArray = (givenArray: any[]): any[] => {
    const array = [...givenArray]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  // File version
  // const _getRandomWords = (category: string = '', numberOfWords: number = 0): any[] => {
  //   const allWordsFromCategory = WordsDB[category as keyof typeof WordsDB]
  //   const randomWords = _createNewShuffledArray(allWordsFromCategory).slice(0, numberOfWords)
  //   return randomWords
  // }

  // MongoDB version
  const _getRandomWords = async (category: string = '', numberOfWords: number = 0): Promise<any[]> => {
    const allWordsFromCategory = (await axios.get(`/api/words/${category}`).then((response) => response.data)).data
    const randomWords = _createNewShuffledArray(allWordsFromCategory).slice(0, numberOfWords)
    return randomWords
  }

  const setUpNewGame = async (category: string = '', numberOfWords: number = 0, gameTime: number = 0): Promise<Boolean> => {
    if (!category || !numberOfWords || !gameTime) {
      return false 
    }
    const words = (await _getRandomWords(category, numberOfWords)).map(word => ({
        id: encodeURIComponent(String(word.text).toLowerCase()),
        text: word.text,
        description: word.description,
        isGuessed: false
      }))
    saveGameWords(words)
    saveGameParams(category, numberOfWords, gameTime)
    setIsNewGameInitialized(true);
    return words.length > 0
  }

  const loadGameWords = (): Word[] => {
    const words = JSON.parse(Cookie.get(GAME_WORDS_COOKIE) || '[]')
    return words as Word[]
  }

  const saveGameWords = (words: Word[]) => {
    console.log(words.map(({text}) => text))
    Cookie.set(GAME_WORDS_COOKIE, JSON.stringify(words))
  }

  const saveGameParams = (category: string, numberOfWords: number, gameTime: number) => {
    Cookie.set(GAME_PARAMS_COOKIE, JSON.stringify({ category, numberOfWords, gameTime }))
  }
  const getGameParams = () => JSON.parse(Cookie.get(GAME_PARAMS_COOKIE) || '{}')

  return {
    setUpNewGame,
    isNewGameInitialized: () => isNewGameInitialized,
    loadGameWords,
    saveGameWords,
    getGameParams
  }
}


export default useGameLoaderManager
