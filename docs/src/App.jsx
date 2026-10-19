import { Routes, Route } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import Home from '@/components/Home.jsx'
import NotFound from '@/components/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
