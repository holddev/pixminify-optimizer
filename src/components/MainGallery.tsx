import { Image } from "../types/types"
import { BeforeAfterImage } from "./BeforeAfterImage"

interface Props {
  images: Image[]
  currentIndex: number
}
export const MainGallery: React.FC<Props> = ({ images, currentIndex }) => {
  return (
    <>
      <ul className="relative w-full h-full bg-white flex items-center justify-center overflow-hidden">
        {images.map((item, index) => (
          <li
            key={index}
            className={`
              absolute w-auto h-full p-10
              transition-opacity duration-300 ease-in-out
              ${currentIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            <BeforeAfterImage
              item={item}
            />
          </li>
        ))}
      </ul>
    </>
  )
}