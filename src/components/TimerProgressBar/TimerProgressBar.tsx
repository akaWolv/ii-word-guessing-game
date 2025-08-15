import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/stopwatch';

const ALERTING_AMMOUNT_OF_TIME = 10

const TimerProgressBar: React.FC<any> = (props: LinearProgressProps & { value: number, time: number }) => {
  const { time } = props

  const getTimer = () => {
    if (time <= 60) {
      return `${time}s`
    } else {
      return `${Math.floor(time / 60)}:${(time % 60).toString().padStart(2, '0')}`
    }
  }

  const getColor = () => time <= ALERTING_AMMOUNT_OF_TIME ? 'secondary' : 'primary';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color={getColor()} />
      </Box>
      <Box sx={{ minWidth: 50, textAlign: 'right' }}>
        <Typography variant="h3" color="text.secondary">
          {getTimer()}
        </Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const timeLeft = useSelector((state: RootState) => state.stopwatch.seconds)
  const initialTime = useSelector((state: RootState) => state.stopwatch.initialSeconds)
  const isAnyTimeLeft = useSelector((state: RootState) => state.stopwatch.isAnyTimeLeft)

  const getProgress = () => Math.floor((timeLeft / initialTime) * 100);

  if (!isAnyTimeLeft) {
    return <Box sx={{ width: '100%', textAlign: 'center' }}>
      <Typography variant="h3" color="text.secondary">
        Times up!
      </Typography>
    </Box>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <TimerProgressBar value={getProgress()} time={timeLeft} />
    </Box>
  );
}