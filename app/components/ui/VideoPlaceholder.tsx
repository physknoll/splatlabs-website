'use client'

import { cn } from '@/lib/utils'

interface VideoPlaceholderProps {
  youtubeUrl?: string
  className?: string
  aspectRatio?: '16:9' | '4:3' | '1:1'
}

function getYouTubeId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : null
}

export function VideoPlaceholder({
  youtubeUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  className,
  aspectRatio = '16:9',
}: VideoPlaceholderProps) {
  const aspectRatios = {
    '16:9': 'pb-[56.25%]',
    '4:3': 'pb-[75%]',
    '1:1': 'pb-[100%]',
  }

  const videoId = getYouTubeId(youtubeUrl)
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`
    : youtubeUrl

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl bg-light-bg-subtle border border-light-border group shadow-soft-lg',
        aspectRatios[aspectRatio],
        className
      )}
    >
      <iframe
        src={embedUrl}
        title="Video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* Live indicator */}
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full border border-light-border text-xs font-medium text-rock-orange opacity-0 group-hover:opacity-100 transition-opacity">
        DEMO
      </div>
    </div>
  )
}
