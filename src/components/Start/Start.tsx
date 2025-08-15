import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Stack, Typography } from '@mui/material'
import { HeaderStyledContainer, StyledLogo, StyledPaper, StyledGame } from 'components/Game/Game.styled'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom';

const Start: React.FC<any> = () => {
  const { 
    category: defaultCategory, 
    numberOfWords: defaultNumberOfWords,
    gameTime: defaultGameTime 
  } = useParams()

  const [category, setCategory] = React.useState(defaultCategory || '');
  const [numberOfWords, setNumberOfWords] = React.useState(defaultNumberOfWords || '');
  const [gameTime, setGameTime] = React.useState(defaultGameTime || '');

  const handleChangeCategory = (event: SelectChangeEvent) => setCategory(event.target.value as string)
  const handleChangeNumberOfWords = (event: SelectChangeEvent) => setNumberOfWords(event.target.value as string)
  const handleChangeGameTime = (event: SelectChangeEvent) => setGameTime(event.target.value as string)

  
  const handleStartGame = () => {
      window.location.href = `/loading/${category}/${numberOfWords}/${gameTime}`
  };
  const isStartGameButtonAllowed = () => category != '' && numberOfWords !== '' && gameTime !== '';

  return (
    <StyledGame>
      <StyledPaper elevation={4}>
        <HeaderStyledContainer>
          <Stack direction="row" spacing={1}>
            <StyledLogo src={logo} className="App-logo" alt="logo" />
            <Typography variant="h3" sx={{lineHeight: 'unset', fontWeight: 'lighter'}}>Start New Word Guessing Game</Typography>
          </Stack>
        </HeaderStyledContainer>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <FormControl fullWidth sx={{ width: '100%' }}>
            <InputLabel id="category-selector-label">Category</InputLabel>
            <Select
              labelId="category-selector-label"
              id="group-selector"
              value={category}
              label="Category"
              onChange={handleChangeCategory}
            >
              <MenuItem value={'animals'}>Zwierzeta</MenuItem>
              <MenuItem value={'popular-people'}>Znane Osoby</MenuItem>
              <MenuItem value={'movie-titles'}>Tytuły Filmów</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ width: '20%' }}>
            <InputLabel id="word-count-selector-label">Words</InputLabel>
            <Select
              labelId="word-count-selector-label"
              id="word-count-selector"
              value={numberOfWords}
              label="Word Count"
              onChange={handleChangeNumberOfWords}
            >
              <MenuItem value={'10'}>10</MenuItem>
              <MenuItem value={'20'}>20</MenuItem>
              <MenuItem value={'40'}>40</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ width: '20%' }}>
            <InputLabel id="game-time-selector-label">Time</InputLabel>
            <Select
              labelId="game-time-selector-label"
              id="game-time-selector"
              value={gameTime}
              label="Game Time"
              onChange={handleChangeGameTime}
            >
              <MenuItem value={'120'}>2:00</MenuItem>
              <MenuItem value={'180'}>3:00</MenuItem>
              <MenuItem value={'300'}>5:00</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Button fullWidth variant="contained" size="large" onClick={handleStartGame} disabled={!isStartGameButtonAllowed()}>
          Start game
        </Button>
      </StyledPaper>
      <ThemeSwitch />
    </StyledGame>
  )
}

export default Start
