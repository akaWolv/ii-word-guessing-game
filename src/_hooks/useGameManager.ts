import { GameInfo, Word } from 'interfaces'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import useBoardGenerator from '_hooks/useBoardGenerator'
// import useBoardHelper from '_hooks/useBoardHelper'
// import useStopwatchManager from '_hooks/useStopwatchManager'

const useGameManager = () => {
  const [currentWord, setCurrentWord] = useState<Word|{}>({})
  const [wordList, setWordList] = useState<Word[]>([])
  const [gameInfo, setGameInfo] = useState<GameInfo|{}>({})

  const _setUp = () => {
    if (wordList.length === 0) {
      setWordList(_getWordList())
    }
  }

  const _setNewRandomWord = () => setCurrentWord(_getRandomWord())

  const _getWordList = (): Word[] => {
    return [
      { id: 'apple', text: 'Apple', isGuessed: false },
      { id: 'banana', text: 'Banana', isGuessed: false },
      { id: 'cherry', text: 'Cherry', isGuessed: false },
      { id: 'date', text: 'Date', isGuessed: false },
      { id: 'elderberry', text: 'Elderberry', isGuessed: false },
      { id: 'fig', text: 'Fig', isGuessed: false },
      { id: 'grape', text: 'Grape', isGuessed: false },
      { id: 'honeydew', text: 'Honeydew', isGuessed: false },
      { id: 'kiwi', text: 'Kiwi', isGuessed: false },
      { id: 'mango', text: 'Mango', isGuessed: false },
      { id: 'orange', text: 'Orange', isGuessed: false },
      { id: 'pear', text: 'Pear', isGuessed: false },
      { id: 'pie', text: 'Pie', isGuessed: false },
      { id: 'poppy', text: 'Poppy', isGuessed: false },
      { id: 'quinoa', text: 'Quinoa', isGuessed: false },
      { id: 'root', text: 'Root', isGuessed: false },
      { id: 'syrup', text: 'Syrup', isGuessed: false },
      { id: 'tanjiawine', text: 'Tanjiawine', isGuessed: false },
      { id: 'watermelon', text: 'Watermelon', isGuessed: false },
      { id: 'xigua', text: 'Xigua', isGuessed: false }
    ];
  }

  const _getAvailableWords = (): Word[] => wordList.filter(({isGuessed}) => !isGuessed);

  const _getRandomWord = (): Word => {
    const availableWordsList = _getAvailableWords();  
    const randomIndex = Math.floor((Math.random() * availableWordsList.length));  
    console.log(availableWordsList, randomIndex, availableWordsList[randomIndex])
    return availableWordsList[randomIndex] || {} as Word;
  }

  const setCurrentWordAsGuessed = () => {
    const { id: currentWordId } = currentWord as Word
    if (currentWordId) {
      const restOfWords = wordList.filter(({id}) => id !== currentWordId)   
      setWordList([...restOfWords, {...currentWord, isGuessed: true} as Word])  
    }
  }

  const _calculateStats = () => {
    const totalWordsCount = wordList.length
    const guessedCount = wordList.filter(({isGuessed}) => isGuessed).length 

    setGameInfo({ 
      totalWordsCount, 
      guessedCount,
      toGuessCount: totalWordsCount - guessedCount
    })  
  }

  useEffect(_setUp, [])
  useEffect(() => {
    _setNewRandomWord()
    _calculateStats()
  }, [wordList])

  return {
    setCurrentWordAsGuessed,
    currentWord: ((): Word => currentWord as Word)(),
    gameInfo: ((): GameInfo => gameInfo as GameInfo)(), 
    // getWordList,
    // getIsGenerated,
    // getHighlightedField,
    // getForbiddenValuesForField,
    // setHighlightedField,
    // changeSelectedFieldValue,
    // getFieldList,
    // getFieldListFromKey,
    // getStepsToGenerate,
    // getReport: getReport(),
    // getFieldsFromSameGroups,
    // isGameFinished: getIsGameFinished,
    // isHintingEnabled: Boolean(isHintingEnabled)
  }
}


export default useGameManager



  // const navigate = useNavigate()
  // const { stopTimer } = useStopwatchManager()
  // const { getBoardCode, getBoardFromCode, getInvalidValuesForField } = useBoardHelper()
  // const { getReport } = useBoardGenerator(difficultyLevel)
  // const [isLoaded, setIsLoaded] = useState<boolean>(false)
  // const [fieldList, setFieldList] = useState<Field[]>([])
  // const [highlightedField, setHighlightedField] = useState<Field | undefined>(undefined)
  // const [isGameFinished, setIsGameFinished] = useState<boolean>(false)
  // const { isHintingEnabled } = difficultyLevel

  // const getFieldsFromSameGroups = (
  //   { square, vLine, hLine }: Field,
  //   fieldList: Field[]
  // ) => {
  //   return fieldList
  //     .filter((field) => {
  //       switch (true) {
  //         case field.square === square:
  //         case field.vLine === vLine:
  //         case field.hLine === hLine:
  //           return true
  //       }
  //       return false
  //     })
  // }

  // const getFieldListFromKey = (gameKey?: string): Field[] | false => {
  //   const predefinedFieldList = getBoardFromCode(gameKey || '')
  //   if (predefinedFieldList) {
  //     setFieldList(predefinedFieldList)
  //     setIsLoaded(true)
  //     const isGameFinished = predefinedFieldList
  //         .filter(({ value, isStatic, isValid }) => (isStatic || Boolean(value)) && isValid)
  //         .length === 81
  //     setIsGameFinished(isGameFinished)
  //     if (isGameFinished) {
  //       stopTimer()
  //     }
  //     return predefinedFieldList
  //   }
  //   return false
  // }

  // const getFieldList = () => {
  //   return fieldList
  // }

  // const getStepsToGenerate = () => {
  //   if (!getReport().length) {
  //     return 0
  //   }

  //   return getReport()
  //     .filter(({ action }) => action === 'square_recursion')
  //     .map(({ tries }) => tries)
  //     .reduce((accumulator, current) => accumulator + current)
  // }

  // const changeSelectedFieldValue = (value: number) => {
  //   if (!highlightedField) {
  //     return
  //   }
  //   highlightedField.value = value
  //   fieldList.forEach((field) => {
  //     if (field.id === highlightedField.id) {
  //       field.value = value
  //     }
  //   })

  //   setHighlightedField({ ...highlightedField })
  //   const boardCode = getBoardCode(fieldList)
  //   navigate(`/${difficultyLevel.key}/${boardCode}`)
  // }

  // const getIsGameFinished = (): boolean => isGameFinished
  // const getHighlightedField = (): Field | undefined => highlightedField
  // const getIsGenerated = (): boolean => isLoaded
  // const getForbiddenValuesForField = (field: Field): number[] => getInvalidValuesForField(field, fieldList)