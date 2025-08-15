import styled from 'styled-components'
import { Paper } from '@mui/material'

// Global
const StyledPaper = styled(Paper)`
  min-width: 780px;
  min-height: 380px;

  margin: 1em;
  padding-bottom: 1em !important;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`

// Header section
const HeaderStyledContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
const StyledLogo = styled.img`
  width: 35px;
  pointer-events: none;
  margin: 0.2em;
`

// Middle section
const TextStyledContainer = styled.div`
  flex-grow: 2;   
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const StyledWord = styled.div`
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

// Bottom section
const StyledPointsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
`

export {
  StyledPaper,
  StyledLogo,
  StyledWord,
  TimerProgressBarStyledContainer,
  TextStyledContainer,
  HeaderStyledContainer,
  StyledPointsContainer
}
