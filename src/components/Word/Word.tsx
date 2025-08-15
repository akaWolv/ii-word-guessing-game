import React from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import { HeaderStyledContainer, StyledLogo, StyledPaper, StyledPointsContainer, StyledWord, TextStyledContainer, TimerProgressBarStyledContainer } from 'components/Word/Word.styled'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import TimerProgressBar from 'components/TimerProgressBar';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import useGameManager from '_hooks/useGameManager';

const Word: React.FC<any> = () => {
  const {
    setCurrentWordAsGuessed,
    currentWord,
    gameInfo
  } = useGameManager()

  console.log(currentWord)
  const { id: wordId, text: wordText } = currentWord
  const { totalWordsCount, guessedCount } = gameInfo
  // const { id: wordId, text: wordText } = getNextWord()

  return (
    <StyledWord>
      {/* 
        <Typography variant="h2">Sudoku</Typography>
        <Typography variant="subtitle2">
          by <a href={'http://indieimp.com'}>IndieImp.com</a>
        </Typography> 
      */}
      <StyledPaper elevation={4}>
        <HeaderStyledContainer>
          <Stack direction="row" spacing={1}>
            <StyledLogo src={logo} className="App-logo" alt="logo" />
            <Typography variant="h3" sx={{lineHeight: 'unset', fontWeight: 'lighter'}}>Test Word</Typography>
          </Stack>
          {/* <Typography variant="h5">Test Word</Typography> */}
          {/* <StyledPointsContainer>
            <Chip icon={<ThumbDown />} label="1" variant="outlined" />
            <Chip icon={<ThumbUp />} label="2" variant="outlined" />
          </StyledPointsContainer> */}
          <Stack direction="row" spacing={1}>
            {/* <Chip icon={<ThumbDown />} label="1" color="error" variant="outlined" />
            <Chip icon={<ThumbUp />} label="2" color="success" variant="outlined" /> */}
            <Chip label={`${guessedCount} / ${totalWordsCount}`} color="default" variant="outlined" sx={{fontSize: "1.5em"}} />
          </Stack>
        </HeaderStyledContainer>
        <TextStyledContainer>
          <Typography variant="h1" >{wordText || ''}</Typography>
          <button onClick={() => setCurrentWordAsGuessed()} >Guess</button>
        </TextStyledContainer>
        <TimerProgressBarStyledContainer>
          <TimerProgressBar />
        </TimerProgressBarStyledContainer>
      </StyledPaper>
      <ThemeSwitch />
    </StyledWord>
  )
}

export default Word
