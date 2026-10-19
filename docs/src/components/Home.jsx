import { useEffect, useState } from 'react'
import {Button} from '@/components/ui/button'
function Home() {
  const [versions, setVersions] = useState([])
  const [error, setError] = useState(null)


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-sm text-neutral-400">
        <div />
        <div className="font-mono border border-neutral-800 rounded-full px-3 py-1">v2.4.7</div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center pt-12">
          <div className="inline-flex items-center rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs text-neutral-300 mb-6">
            Free Firefox Add-on · 100% Private
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[0.95]">
            Copy Any <span className="text-red-500">Youtube</span> Transcript in One Click
          </h1>

          <p className="mt-6 text- leading-7 text-neutral-400 max-w-2xl mx-auto">
            Tired of manually copying YouTube transcripts? <span className="text-white font-semibold">YouTube Transcript Yoinker</span> adds a "Yoink Transcript" button next to Subscribe. One click to auto-open, clean timestamps, and copy plain text to your clipboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button>
            <a href="https://addons.mozilla.org/en-US/firefox/addon/yt-transcript-yoinker/" target="_blank" rel="noopener">
              Get addon
            </a>
          </Button>

            <Button variant="secondary">
            <a href="https://github.com/pawanhirumina/yt-transcript-copier" target="_blank" rel="noopener">
              View on Github
            </a>
          </Button>

          </div>

          <div className="mt-10 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
            <video autoPlay loop muted playsInline preload="metadata" className="w-full">
              <source src="/demo.mp4" type="video/mp4" />
              <source src="/demo.webm" type="video/webm" />
            </video>
          </div>

          <div className="mt-16 text-left md:text-center">
            <h2 className="text- font-semibold tracking-tight">Why use <span className="text-red-500">Yoinker?</span></h2>
            <p className="mt-3 text-neutral-400 leading-6">
              Unlike online transcript downloaders, Yoinker does everything <strong className="text-white">locally in your browser</strong>. No external server, no account, no tracking. Perfect for students, researchers, and creators who need clean transcripts.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
            {[
              ["One-click copy", "→ clipboard"],
              ["Full transcript", "no truncation"],
              ["Works on video pages", "auto-opens"],
              ["Timestamp toggle", "with/without time"],
              ["Lightweight", "< 20kb"],
              ["Privacy-first", "local only"],
            ].map(([a, b]) => (
              <div key={a} className="flex justify-between items-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3">
                <span className="text-sm font-medium text-white">{a}</span>
                <em className="text-xs text-neutral-500 not-italic">{b}</em>
              </div>
            ))}
          </div>

          <div className="my-12 h-px bg-neutral-800" />


          <footer className="mt-20 flex flex-col gap-3 items-center text-sm text-neutral-500">
            <div>Built by <a href="https://pawanhirumina.dev" className="text-white hover:underline">Pawan Hirumina</a></div>
            <div className="flex gap-3">
              <a href="https://github.com/pawanhirumina/yt-transcript-copier" className="hover:text-white">Github Repo</a> |
              <a href="https://addons.mozilla.org/en-US/firefox/addon/yt-transcript-yoinker/" className="hover:text-white">Get Addon</a> |
              <a href="https://github.com/pawanhirumina/yt-transcript-yoinker/issues" className="hover:text-white">Report</a> |
              <a href="https://www.paypal.com/ncp/payment/TR8LMVU7FXPDG" className="hover:text-white">Support</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default Home
