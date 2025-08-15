import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  seconds: number
  initialSeconds: number
  time: string
  intervalLoopId: null|NodeJS.Timer
  isAnyTimeLeft: boolean
}

const initialState: CounterState = {
  seconds: 0,
  initialSeconds: 0,
  time: '',
  intervalLoopId: null,
  isAnyTimeLeft: false
}

const getTime = (seconds: number) => {
  const minutesPresentation = String(Math.floor(seconds / 60)).padStart(2, '0')
  const stringPresentation = String(seconds % 60).padStart(2, '0')
  return `${minutesPresentation}:${stringPresentation}`
}

export const stopwatchSlice = createSlice({
  name: 'stopwatch',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.seconds = action.payload
      state.time = getTime(action.payload)
      state.isAnyTimeLeft = state.seconds > 0
    },
    setInitialTime: (state, action: PayloadAction<number>) => {
      state.initialSeconds = action.payload
    },
    setIntervalLoopId: (state, action: PayloadAction<null|NodeJS.Timer>) => {
      state.intervalLoopId = action.payload
    },
  },
})

export const { setTime, setInitialTime, setIntervalLoopId } = stopwatchSlice.actions

export default stopwatchSlice.reducer
