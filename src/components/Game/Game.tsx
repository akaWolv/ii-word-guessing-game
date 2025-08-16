import React from 'react'
import { Box, Chip, IconButton, Stack, Typography } from '@mui/material'
import { StyledLogo, StyledPaper, StyledGame, TextStyledContainer, TimerProgressBarStyledContainer } from 'components/Game/Game.styled'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import TimerProgressBar from 'components/TimerProgressBar';
import useGameManager from '_hooks/useGameManager';
import SummaryBlend from 'components/SummaryBlend';
import { useGesture } from '@use-gesture/react'
import { Refresh, ThumbUp } from '@mui/icons-material';
import PauseDialog from 'components/PleaseRotate';

const Game: React.FC<any> = () => {
  const {
    setNewRandomWord,
    setCurrentWordAsGuessed,
    currentWord,
    gameInfo,
    isGameInProgress,
    pauseGame,
    resumeGame
  } = useGameManager()

  const { text: wordText, description: wordDescription } = currentWord
  const { totalWordsCount, guessedCount } = gameInfo

  const bind = useGesture(
    {
      // onDrag: (state) => console.log(state),
      // onDragStart: (state) => console.log(state),
      onDragEnd: (state) => {
        const {
          swipe,         // [swipeX, swipeY] 0 if no swipe detected, -1 or 1 otherwise
          tap,           // is the drag assimilated to a tap
        } = state
        if (!tap && swipe && swipe[0] != 0) {
          setNewRandomWord()
        }
      },
      // onPinch: (state) => console.log(state),
      // onPinchStart: (state) => console.log(state),
      // onPinchEnd: (state) => console.log(state),
      // onScroll: (state) => console.log(state),
      // onScrollStart: (state) => console.log(state),
      // onScrollEnd: (state) => console.log(state),
      // onMove: (state) => console.log(state),
      // onMoveStart: (state) => console.log(state),
      // onMoveEnd: (state) => console.log(state),
      // onWheel: (state) => console.log(state),
      // onWheelStart: (state) => console.log(state),
      // onWheelEnd: (state) => console.log(state),
      // onHover: (state) => console.log(state)
    },
    {}
  )

  return (
    <StyledGame>
      <StyledPaper {...bind()} elevation={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Box sx={{ width: '110px' }}>
            <PauseDialog pauseGame={pauseGame} resumeGame={resumeGame}>
              <StyledLogo src={logo} className="App-logo" alt="logo" />
            </PauseDialog>
          </Box>
          <Chip label={`${guessedCount} / ${totalWordsCount}`} color="default" variant="outlined" sx={{ fontSize: "1.5em" }} onClick={() => setNewRandomWord()} />
          <Box sx={{ width: '110px' }}>
            <ThemeSwitch />
          </Box>
        </Stack>
        <TextStyledContainer>
          <Typography variant="h1" onClick={() => setCurrentWordAsGuessed()}>{wordText || ''}</Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ fontSize: "1.2em" }} >{wordDescription || ''}</Typography>
          {/* <button onClick={() => setCurrentWordAsGuessed()} >Guess</button> */}
        </TextStyledContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <IconButton aria-label="New word" color="primary" onClick={() => setNewRandomWord()}>
            <Refresh />
          </IconButton>
          <IconButton aria-label="Word guessed" color="primary" onClick={() => setCurrentWordAsGuessed()}>
            <ThumbUp />
          </IconButton>
        </Stack>
        <TimerProgressBarStyledContainer>
          <TimerProgressBar />
        </TimerProgressBarStyledContainer>
        {!isGameInProgress && totalWordsCount && <SummaryBlend gameInfo={gameInfo} />}
      </StyledPaper>
    </StyledGame>
  )
}

export default Game
