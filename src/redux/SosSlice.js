import { createSlice } from '@reduxjs/toolkit'

const sosSlice = createSlice({
  name: 'sos',
  initialState: {sos : false},
  reducers: {
    ChangeToTrue: (state) => {
        state.sos = !state.sos
  }}
})


export const {ChangeToTrue} = sosSlice.actions
export const sosTrue = (state) => {state.sos.value}
export default sosSlice.reducer