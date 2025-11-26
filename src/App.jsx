import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import QrGenerator from './pages/QrGenerator'
import Translator from './pages/Translator'
import UrlShortener from './pages/UrlShortener'
import Docs from './pages/Docs'
import PasswordGenerator from './pages/PasswordGenerator'
import TypingTest from './pages/TypingTest'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="qr" element={<QrGenerator />} />
        <Route path="translate" element={<Translator />} />
        <Route path="shorten" element={<UrlShortener />} />
        <Route path="docs" element={<Docs />} />
        <Route path="password" element={<PasswordGenerator />} />
        <Route path="typing-test" element={<TypingTest />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
