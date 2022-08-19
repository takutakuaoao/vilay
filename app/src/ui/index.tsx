import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'

const container = document.getElementById('desktop-app-container')
const root = createRoot(container!)
root.render(<App />)
