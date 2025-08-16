import { alpha, Button, colors, Paper, Typography } from '@mui/material'
import styled from 'styled-components'

const StyledSummaryBlend = styled.div`
  background-color: ${alpha(colors.lightGreen[800], 0.9)};
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  
  -webkit-transition: opacity 2s ease-in;
  -moz-transition: opacity 2s ease-in;
  -o-transition: opacity 2s ease-in;
  -ms-transition: opacity 2s ease-in;
  transition: opacity 2s ease-in;
`
const StyledTime = styled(Paper)`
  font-size: 2em !important;
  background-color: ${colors.lightGreen[900]} !important;
  margin: 0 !important;
  display: flex;
  direction: column;
  justify-content: center;
  align-items: center;
  color: ${colors.grey[200]} !important;
`
const StyledEmoji = styled(Typography)`
  font-size: 100px !important;
  text-align: center;
`
export {
  StyledSummaryBlend,
  StyledTime,
  StyledEmoji,
}
