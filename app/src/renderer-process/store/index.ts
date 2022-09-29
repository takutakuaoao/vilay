import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux'
import { getContent } from '../features/editor/ui/editor'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    content: '',
  },
  reducers: {
    update: (state, action) => {
      state.content = action.payload
    },
  },
})

export const { update } = noteSlice.actions
const noteReducer = noteSlice.reducer

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector

window.electron.receive('saveCommand', (data: any[]) => {
  window.electron.send('editorSender', [getContent()])
})
