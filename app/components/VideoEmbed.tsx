'use client'

interface VideoEmbedProps {
  videoId: string
  title?: string
  className?: string
}

export default function VideoEmbed({ 
  videoId, 
  title = "SafeDrop Video", 
  className = "" 
}: VideoEmbedProps) {
  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl glow-on-hover group border-2 border-white/20 bg-slate-900 ${className}`}>
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      </div>
      
      {/* Video overlay effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/0 group-hover:border-blue-400/50 transition-all duration-300 pointer-events-none" />
    </div>
  )
} 