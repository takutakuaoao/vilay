import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { App } from './app'
import { store } from './store'

const container = document.getElementById('desktop-app-container')
const root = createRoot(container!)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
