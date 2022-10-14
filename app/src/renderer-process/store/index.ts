import { configureStore, createSlice } from '@reduxjs/toolkit'
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux'
import { AsciidocContent } from '../domain/asciidoc-content'

const previewSlice = createSlice({
  name: 'preview',
  initialState: {
    preview: '',
  },
  reducers: {
    update: (state, action) => {
      const asciidocContent = AsciidocContent.fromText(action.payload)
      state.preview = asciidocContent.parseHTML()
    },
  },
})

export const { update } = previewSlice.actions

const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    isInit: false,
  },
  reducers: {
    openFile: state => {
      state.isInit = true
    },
  },
})

export const { openFile } = editorSlice.actions

export const store = configureStore({
  reducer: {
    preview: previewSlice.reducer,
    editor: editorSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
