import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Chip } from '@mui/material';

const ALERTING_AMMOUNT_OF_TIME = 10

function TimerProgressBar(props: LinearProgressProps & { value: number, time: number }) {
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
  const totalTime = 62
  const [timeLeft, setTimeLeft] = React.useState(totalTime);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft > 0 ? prevTimeLeft - 1 : 0);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getProgress = () => Math.floor((timeLeft / totalTime) * 100);

  return (
    <Box sx={{ width: '100%' }}>
      <TimerProgressBar value={getProgress()} time={timeLeft} />
    </Box>
  );
}