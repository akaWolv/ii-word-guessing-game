import { useEffect, useRef, useState } from 'react'
import Cookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { setTime, setIntervalLoopId, setInitialTime } from 'features/stopwatch/stopwatchSlice'
import { RootState } from 'stores/stopwatch'

const STOPWATCH_COOKIE = 'stopwatch'
const STOPWATCH_INITIAL_COOKIE = 'stopwatch-initial'

const useStopwatchManager = () => {
  const intervalLoopId = useSelector((state: RootState) => state.stopwatch.intervalLoopId)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [savedTime, setSavedTime] = useState<null|number>(null)
  const intervalId = useRef<null|NodeJS.Timer>(null)
  const dispatch = useDispatch()

  const loop = () => {
    if (Boolean(intervalId.current)) {
      return;
    }

    if (!isRunning) {
      intervalId.current && clearInterval(intervalId.current)
      return;
    }

    let newTime = (savedTime || 0)
    intervalId.current = setInterval(() => {
      --newTime
      dispatch(setTime(newTime))
      Cookie.set(STOPWATCH_COOKIE, String(newTime))
    }, 1000)

    dispatch(setIntervalLoopId(intervalId.current))
  }

  const resumeTimer = () => {
    if (isRunning) {
      return
    }

    const storedCurrentTime = Number(Cookie.get(STOPWATCH_COOKIE) || 0)
    setSavedTime(storedCurrentTime)
    dispatch(setTime(storedCurrentTime))
    dispatch(setInitialTime(Number(Cookie.get(STOPWATCH_INITIAL_COOKIE) || 0)))
    setIsRunning(true)
  }

  const resetTimer = (time: number) => {
    setSavedTime(time)
    setIsRunning(false)
    Cookie.set(STOPWATCH_COOKIE, String(time))
    Cookie.set(STOPWATCH_INITIAL_COOKIE, String(time))
  }

  const stopTimer = () => {
    const timerToStop = intervalId.current ?? intervalLoopId ?? null
    if (!timerToStop) {
      return;
    }

    clearInterval(timerToStop)
    intervalId.current = null
    setIntervalLoopId(null)
    setIsRunning(false)
  }

  useEffect(loop, [isRunning])

  return {
    resumeTimer,
    resetTimer,
    stopTimer,
  }
}


export default useStopwatchManager
