import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-neutral-400">This transcript got lost.</p>
      <Button asChild className="mt-2">
        <Link to="/">Go home</Link>
      </Button>
    </div>
  )
}
