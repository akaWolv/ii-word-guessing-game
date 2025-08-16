import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import StopwatchWrapper from 'common/AppProvider/StopwatchWrapper'
import AppProvider from 'common/AppProvider'
import PleaseRotate from './components/PleaseRotate'
import Game from 'components/Game'
import Setup from 'components/Setup'
import LoadingScreen from 'components/LoadingScreen'
import Welcome from 'components/Welcome'

const App = () => {
  return (
    <AppProvider>
      {/* <StopwatchWrapper> */}
        <div className="App">
          <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<Start />} />
                <Route path="/:difficultyLevelKey" element={<StartLevel />} />
                <Route path="/:difficultyLevelKey/:gameKey" element={<Game />} /> */}
                <Route path="/" element={<Welcome />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/setup/:category/:numberOfWords/:gameTime" element={<Setup />} />
                <Route path="/loading/:category/:numberOfWords/:gameTime" element={<LoadingScreen />}/>
                <Route path="/game" element={<Game />} />
              </Routes>
          </BrowserRouter>
        </div>
      {/* </StopwatchWrapper> */}
      <PleaseRotate />
    </AppProvider>
  )
}

export default App
