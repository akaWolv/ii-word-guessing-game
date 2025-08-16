import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Chip, Stack, Typography } from '@mui/material'
import { GameInfo } from 'interfaces'
import { StyledSummaryBlend, StyledTime, StyledEmoji } from './SummaryBlend.styled'
import { ThumbUp, Verified, VolunteerActivism } from '@mui/icons-material';
import type { RootState } from 'stores/stopwatch'
import useGameLoaderManager from '_hooks/useGameLoaderManager'

interface SummaryBlend {
  gameInfo: GameInfo
}

const SummaryBlend = ({ gameInfo }: SummaryBlend) => {
  const time = useSelector((state: RootState) => state.stopwatch.time)
  const { getGameParams } = useGameLoaderManager()

  const { totalWordsCount, guessedCount } = gameInfo

  const getIcon = () => {
    const result = guessedCount / totalWordsCount
    if (result == 1) {
      return <Verified sx={{ fontSize: '1.5em' }} />
    } else if (result > 0.5) {
      return <ThumbUp sx={{ fontSize: '1.5em' }} />
    }

    return <VolunteerActivism sx={{ fontSize: '1.5em' }} />
  }

  const handleNextGameClicked = () => {
    const { category, numberOfWords, gameTime } = getGameParams()

    if (category && numberOfWords && gameTime) {
      window.location.href = `/setup/${category}/${numberOfWords}/${gameTime}`
    } else {
      window.location.href = `/setup`
    }
  }

  return (
    <StyledSummaryBlend>
      <Stack direction="column" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          {
            totalWordsCount &&
            <StyledTime>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Typography variant="h3">Score:</Typography>
                {getIcon()}
                <Typography variant="h2">{guessedCount} / {totalWordsCount}</Typography>
              </Stack>
            </StyledTime>
          }
          <Stack direction="column" spacing={3} sx={{ height: "100%" }} >
            <StyledEmoji variant='h1'>🐇</StyledEmoji>
            <Typography variant="h3" color="text.secondary">Yeah, bunny!</Typography>
          </Stack>
        </Stack>

        <Button
          variant='contained'
          fullWidth
          onClick={handleNextGameClicked}
          sx={{ fontSize: "1.5em" }}
        >
          Another game?
        </Button>
      </Stack>
    </StyledSummaryBlend>
  )
}

export default SummaryBlend
