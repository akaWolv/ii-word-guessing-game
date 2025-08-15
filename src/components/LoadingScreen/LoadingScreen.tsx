import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
// import useBoardGenerator from '_hooks/useBoardGenerator'
// import useBoardHelper from '_hooks/useBoardHelper'
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import { StyledStartLevel } from 'components/LoadingScreen/LoadingScreen.styled'
import useStopwatchManager from '_hooks/useStopwatchManager'
import useGameLoaderManager from '_hooks/useGameLoaderManager'

const LoadingScreen: React.FC<any> = () => {
  const { category, numberOfWords, gameTime } = useParams()
  const { setUpNewGame } = useGameLoaderManager()
  const { resetTimer } = useStopwatchManager()

  useEffect(() => {
    resetTimer(parseInt(gameTime || ''))
    setUpNewGame(category, parseInt(numberOfWords || ''), parseInt(gameTime || ''))
    setTimeout(() => { window.location.href = `/game` }, 0)
  }, [])

  return <StyledStartLevel>
    <HourglassBottomTwoToneIcon sx={{ fontSize: 80 }} />
    <Typography variant='h4'>game is loading...</Typography>
  </StyledStartLevel>
}

export default LoadingScreen
