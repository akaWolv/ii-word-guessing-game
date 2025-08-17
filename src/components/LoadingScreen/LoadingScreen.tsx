import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Typography } from '@mui/material'
import HourglassBottomTwoToneIcon from '@mui/icons-material/HourglassBottomTwoTone';
import { StyledStartLevel } from 'components/LoadingScreen/LoadingScreen.styled'
import useStopwatchManager from '_hooks/useStopwatchManager'
import useGameLoaderManager from '_hooks/useGameLoaderManager'

const LoadingScreen: React.FC<any> = () => {
  const { category, numberOfWords, gameTime } = useParams()
  const { setUpNewGame } = useGameLoaderManager()
  const { resetTimer } = useStopwatchManager()

  const [error, setError] = React.useState('');

  useEffect(() => {
    resetTimer(parseInt(gameTime || ''))
    setUpNewGame(category, parseInt(numberOfWords || ''), parseInt(gameTime || ''))
      .then((response) => {
        if (response) {
          setTimeout(() => { window.location.href = `/game` }, 0)
        } else {
          setError('Loading game failed, params are icorrected, please try again.')
          setTimeout(() => { window.location.href = `/setup` }, 3000)
        }
      })
      .catch((error) => {
        setError(`${error.name}: ${error.message}`)
        console.error(error)
      })
  }, [])

  return (
    <StyledStartLevel>
        <HourglassBottomTwoToneIcon sx={{ fontSize: 80 }} />
        <Typography variant='h4'>game is loading...</Typography>
        {error && <Alert severity="error">{error}</Alert>}
    </StyledStartLevel>
  )
}

export default LoadingScreen
