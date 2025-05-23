import { useRef } from "react"
import { Image } from "../types/types";

interface Props {
  images: Image[]
  currentIndex: number
  onTumbnailClick: (index: number) => void
}

export const TumbnailCarrousel: React.FC<Props> = ({ images, currentIndex, onTumbnailClick }) => {
  const scrollContainerRef = useRef<HTMLUListElement>(null)

  const handleScroll = (e: React.WheelEvent) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="h-[110px] w-full bg-black/90 rounded-md backdrop-blur-md flex items-center justify-center overflow-hidden">
      <ul
        className="h-full w-full flex items-center justify-start gap-1 overflow-x-auto px-3"
        ref={scrollContainerRef}
        onWheel={handleScroll}
      >
        {images.map((item, index) => (
          <li className="h-4/5 flex-shrink-0" key={index}>
            <button
              className="h-full"
              aria-label={`Ver la imagen ${item.image.name}`}
              onClick={() => { onTumbnailClick(index) }}
            >
              <img
                className={`h-16 w-16 object-center object-contain 
                ${index === currentIndex ? 'grayscale-0 scale-110' : 'grayscale'}
                hover:grayscale-0 transition-all duration-500
                hover:scale-110`}
                src={URL.createObjectURL(item.image)}
                alt={item.image.name}
              />
              {index}
              {currentIndex}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}