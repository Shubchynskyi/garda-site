import { useState } from "react";
import { Play } from "lucide-react";

type YouTubeFacadeProps = {
  videoId: string;
  title: string;
  poster: string;
  posterWidth: number;
  posterHeight: number;
};

// Shows a locally hosted poster and loads the YouTube player only after a click,
// so no request reaches YouTube or Google until the visitor chooses to play.
export function YouTubeFacade({ videoId, title, poster, posterWidth, posterHeight }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <iframe
        className="block aspect-video w-full border-0 bg-[#080b11]"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play video: ${title}`}
      className="group relative block aspect-video w-full cursor-pointer bg-[#080b11] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cyan-300"
    >
      <img src={poster} width={posterWidth} height={posterHeight} alt="" loading="lazy" decoding="async" className="block h-full w-full object-cover" />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/30 bg-[#080b11]/75 pl-1 text-cyan-50 shadow-[0_12px_40px_rgba(0,0,0,0.45)] transition group-hover:scale-105 group-hover:bg-[#080b11]/90 group-focus-visible:scale-105 sm:h-16 sm:w-16 md:h-20 md:w-20"
      >
        <Play className="h-6 w-6 fill-current sm:h-7 sm:w-7" />
      </span>
      <span className="absolute bottom-2 right-2 rounded-full bg-[#080b11]/80 px-2 py-0.5 text-[11px] text-white/75 sm:bottom-auto sm:right-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs md:right-4 md:top-4">
        Loads from YouTube when you press play
      </span>
    </button>
  );
}
