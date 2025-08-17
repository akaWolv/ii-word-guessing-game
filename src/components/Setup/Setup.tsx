import React, { useEffect } from 'react'
import { Backdrop, Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Stack, Typography } from '@mui/material'
import logo from 'indieimp.svg'
import ThemeSwitch from 'components/ThemeSwitch';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import { StyledGame, StyledLogo, StyledPaper } from './Setup.styled';
import { default as SetupConfig } from 'constants/Setup'
import useSetupManager from '_hooks/useGameSetupManager';
import { GameSetup } from 'interfaces'

const Setup: React.FC<any> = () => {
  const {
    category: defaultCategory,
    numberOfWords: defaultNumberOfWords,
    gameTime: defaultGameTime
  } = useParams()

  const { getSetupPreferences } = useSetupManager()

  const [category, setCategory] = React.useState(defaultCategory || '');
  const [numberOfWords, setNumberOfWords] = React.useState(defaultNumberOfWords || '');
  const [gameTime, setGameTime] = React.useState(defaultGameTime || '');

  const [availableCategories, setAvailableCategories] = React.useState(SetupConfig.availableCategories || []);
  const [availableWordListSizes, setAvailableWordListSizes] = React.useState(SetupConfig.availableWordListSizes || []);
  const [availableTimes, setAvailableTimes] = React.useState(SetupConfig.availableTimes || []);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleChangeCategory = (event: SelectChangeEvent) => setCategory(event.target.value as string)
  const handleChangeNumberOfWords = (event: SelectChangeEvent) => setNumberOfWords(event.target.value as string)
  const handleChangeGameTime = (event: SelectChangeEvent) => setGameTime(event.target.value as string)

  const handleStartGame = () => {
    window.location.href = `/loading/${category}/${numberOfWords}/${gameTime}`
  };
  const isStartGameButtonAllowed = () => category != '' && numberOfWords !== '' && gameTime !== '';

  useEffect(() => {
    getSetupPreferences()
      .then((setup: GameSetup) => {
        setAvailableCategories(setup.availableCategories)
        setAvailableWordListSizes(setup.availableWordListSizes)
        setAvailableTimes(setup.availableTimes)
        setIsLoading(false)
      })
      .catch((error) => {
        alert(`${error.name}: ${error.message}`);
        console.error(error);
      })
  }, [])

  return (
    <StyledGame>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <StyledPaper elevation={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Box sx={{ width: '110px' }} onClick={() => { window.location.href = `/` }}>
            <StyledLogo src={logo} className="App-logo" alt="logo" />
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
              {availableCategories.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
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
              {availableWordListSizes.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
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
              {availableTimes.map(({ name, value }) => <MenuItem key={value} value={value}>{name}</MenuItem>)}
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
