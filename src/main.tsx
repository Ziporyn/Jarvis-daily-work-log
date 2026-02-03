import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './style.css'
import Home from './Home'
import Archive from './Archive'
import Articles from './Articles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
