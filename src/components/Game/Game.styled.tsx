import styled from 'styled-components'
import { Paper } from '@mui/material'

// Global
const StyledPaper = styled(Paper)`
  min-width: 90vw;
  min-height: 90vh;

  margin: 0;
  margin-top: 25vh;
  padding: 1em !important;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  touch-action: none;
`

// Header section
const StyledLogo = styled.img`
  width: 35px;
  pointer-events: none;
  margin: 0.2em;
`

// Middle section
const TextStyledContainer = styled.div`
  max-width: 75vw !important;
  flex-grow: 2;   
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const StyledGame = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

// Bottom section
const TimerProgressBarStyledContainer = styled.div`
    width :100%;   
`

export {
  StyledPaper,
  StyledLogo,
  StyledGame,
  TimerProgressBarStyledContainer,
  TextStyledContainer,
}
