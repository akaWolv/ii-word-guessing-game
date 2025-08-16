import React, { useEffect } from 'react'
import { Button, Grid, Stack, Typography } from '@mui/material'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import { StyledLogo, StyledPaper, StyledStart } from './Welcome.styled';

const Welcome: React.FC<any> = () => {
  const handleNextGameClicked = () => {
    window.location.href = `/setup`
  }

  // useEffect(() => {
  //   window.scrollTo(0, 1);
  //   console.log('scrool')
  // }, [])

  return (
    <StyledStart>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{height: "100%"}}
      >

        <StyledLogo src={logo} className="App-logo" alt="logo" />
        <Typography variant="h2">Word Guessing Game</Typography>
        <Typography variant="subtitle2">
          by <a href={'http://indieimp.com'}>IndieImp.com</a>
        </Typography>

        <Button
          variant='contained'
          onClick={handleNextGameClicked}
          sx={{ fontSize: "1.5em" }}
        >
          Start new game
        </Button>
        <ThemeSwitch />
      </Stack>
    </StyledStart>
  )
}

export default Welcome
