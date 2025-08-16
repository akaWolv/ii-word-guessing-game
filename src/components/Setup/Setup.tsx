import React from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Stack, Typography } from '@mui/material'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import { StyledGame, StyledLogo, StyledPaper } from './Setup.styled';
import {default as SetupConfig} from 'constants/Setup'

const Setup: React.FC<any> = () => {
  // const selectCategories = import.meta.env.VITE_AVAILABLE_CATEGORIES ? import.meta.env.VITE_AVAILABLE_CATEGORIES.split(',') : [];
  // const selectWordListSizes = import.meta.env.VITE_AVAILABLE_WORDS_LIST_SIZES ? import.meta.env.VITE_AVAILABLE_WORDS_LIST_SIZES.split(',') : [];
  // const selectTimes = import.meta.env.VITE_AVAILABLE_GAME_TIMES ? import.meta.env.VITE_AVAILABLE_GAME_TIMES.split(',') : [];

  const {
    category: defaultCategory,
    numberOfWords: defaultNumberOfWords,
    gameTime: defaultGameTime
  } = useParams()

  const [category, setCategory] = React.useState(defaultCategory || '');
  const [numberOfWords, setNumberOfWords] = React.useState(defaultNumberOfWords || '');
  const [gameTime, setGameTime] = React.useState(defaultGameTime || '');
  const [availableCategories, setAvailableCategories] = React.useState(SetupConfig.availableCategories || []);
  const [availableWordListSizes, setAvailableWordListSizes] = React.useState(SetupConfig.availableWordListSizes || []);
  const [availableTimes, setAvailableTimes] = React.useState(SetupConfig.availableTimes || []);

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
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{width: '100%'}}
        >
          <Box sx={{ width: '110px' }} onClick={() => { window.location.href = `/` }}>
            <StyledLogo src={logo} className="App-logo" alt="logo"  />
          </Box>
          <Typography variant="h3" sx={{ lineHeight: 'unset', fontWeight: 'lighter' }}>Game Setup</Typography>
          <Box sx={{ width: '110px' }}>
            <ThemeSwitch />
          </Box>
        </Stack>
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
              variant="filled"
              onChange={handleChangeCategory}
            >
              { availableCategories.map(({name, value}) => <MenuItem key={value} value={value}>{name}</MenuItem>) }
            </Select>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <FormControl fullWidth>
            <InputLabel id="word-count-selector-label">Words</InputLabel>
            <Select
              labelId="word-count-selector-label"
              id="word-count-selector"
              value={numberOfWords}
              label="Word Count"
              variant="filled"
              onChange={handleChangeNumberOfWords}
            >
              { availableWordListSizes.map(({name, value}) => <MenuItem key={value} value={value}>{name}</MenuItem>) }
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="game-time-selector-label">Time</InputLabel>
            <Select
              labelId="game-time-selector-label"
              id="game-time-selector"
              value={gameTime}
              label="Game Time"
              variant="filled"
              onChange={handleChangeGameTime}
            >
              { availableTimes.map(({name, value}) => <MenuItem key={value} value={value}>{name}</MenuItem>) }
            </Select>
          </FormControl>
        </Stack>
        <Button fullWidth variant="contained" size="large" onClick={handleStartGame} disabled={!isStartGameButtonAllowed()}>
          Start game
        </Button>
      </StyledPaper>

    </StyledGame>
  )
}

export default Setup
