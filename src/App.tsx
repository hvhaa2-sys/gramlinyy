import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AntiPhishing } from './pages/AntiPhishing'
import { Diagnosis } from './pages/Diagnosis'
import { Glossary } from './pages/Glossary'
import { Home } from './pages/Home'
import { Memo } from './pages/Memo'
import { PlatformDetail } from './pages/PlatformDetail'
import { Platforms } from './pages/Platforms'
import { PlaybookDetail } from './pages/PlaybookDetail'
import { Recovery } from './pages/Recovery'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="diagnosis" element={<Diagnosis />} />
          <Route path="platforms" element={<Platforms />} />
          <Route path="platforms/:id" element={<PlatformDetail />} />
          <Route path="antiphishing" element={<AntiPhishing />} />
          <Route path="recovery" element={<Recovery />} />
          <Route path="recovery/:id" element={<PlaybookDetail />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="memo" element={<Memo />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
