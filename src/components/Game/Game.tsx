import React from 'react'
import { Chip, Stack, Typography } from '@mui/material'
import { HeaderStyledContainer, StyledLogo, StyledPaper, StyledPointsContainer, StyledGame, TextStyledContainer, TimerProgressBarStyledContainer } from 'components/Game/Game.styled'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import TimerProgressBar from 'components/TimerProgressBar';
import useGameManager from '_hooks/useGameManager';
import WinnerBlend from 'components/WinnerBlend';

const Game: React.FC<any> = () => {
  const {
    setCurrentWordAsGuessed,
    currentWord,
    gameInfo,
    isGameInProgress
  } = useGameManager()

  const { id: wordId, text: wordText, description: wordDescription } = currentWord
  const { totalWordsCount, guessedCount } = gameInfo

  return (
    <StyledGame>
      <StyledPaper elevation={4}>
        <HeaderStyledContainer>
          <Stack direction="row" spacing={1}>
            <StyledLogo src={logo} className="App-logo" alt="logo" />
            <Typography variant="h3" color="text.secondary" sx={{lineHeight: 'unset', fontWeight: 'lighter'}}>Test Word</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip label={`${guessedCount} / ${totalWordsCount}`} color="default" variant="outlined" sx={{fontSize: "1.5em"}} />
          </Stack>
        </HeaderStyledContainer>
        <TextStyledContainer>
          <Typography variant="h1" >{wordText || ''}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{fontSize: "1.2em"}} >{wordDescription || ''}</Typography>
          <button onClick={() => setCurrentWordAsGuessed()} >Guess</button>
        </TextStyledContainer>
        <TimerProgressBarStyledContainer>
          <TimerProgressBar />
        </TimerProgressBarStyledContainer>
        {!isGameInProgress && <WinnerBlend gameInfo={gameInfo} />}
      </StyledPaper>
      <ThemeSwitch />
    </StyledGame>
  )
}

export default Game
