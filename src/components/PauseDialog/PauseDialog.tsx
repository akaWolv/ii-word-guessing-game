import React from 'react'
import logo from 'indieimp.svg'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import useGameLoaderManager from '_hooks/useGameLoaderManager'

interface PauseDialog {
  children: React.ReactElement<any>
  pauseGame: Function
  resumeGame: Function
}

const PauseDialog: React.FC<any> = ({ children, pauseGame, resumeGame }: PauseDialog) => {
  const [open, setOpen] = React.useState(false);
  const { getGameParams } = useGameLoaderManager()
  
  const handleClickOpen = () => {
    setOpen(true);
    pauseGame();
  };

  const handleClose = () => {
    resumeGame();
    setOpen(false);
  };

  const handleNextGameClicked = () => {
    const { category, numberOfWords, gameTime } = getGameParams()

    if (category && numberOfWords && gameTime) {
      window.location.href = `/setup/${category}/${numberOfWords}/${gameTime}`
    } else {
      window.location.href = `/setup`
    }
  }

  return (
    <React.Fragment>
      <div onClick={() => handleClickOpen()}>
        {children}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Game Paused"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to exit current game? <br /> 
            You will loose your progress!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNextGameClicked} fullWidth>Exit game</Button>
          <Button onClick={handleClose} fullWidth>Back to game</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default PauseDialog

