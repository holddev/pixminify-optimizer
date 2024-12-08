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
    <div className="h-[20vh] w-full bg-primary flex items-center justify-center ">
      <ul
        className="h-full w-full flex items-center justify-start gap-1 overflow-x-scroll"
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
                className={`h-full w-16 object-center object-contain 
                ${index === currentIndex ? 'grayscale-0 scale-110' : 'grayscale'}
                hover:grayscale-0 transition-all duration-500
                hover:scale-110`}
                src={URL.createObjectURL(item.image)}
                alt={item.image.name}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}