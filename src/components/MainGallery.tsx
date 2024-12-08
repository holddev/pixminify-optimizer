import { Image } from "../types/types"

interface Props {
  images: Image[]
  currentIndex: number
}
export const MainGallery: React.FC<Props> = ({ images, currentIndex }) => {
  return (
    <>
      <ul className="relative w-full h-[80%] bg-red-500 flex items-center justify-center overflow-hidden">
        {images.map((item, index) => (
          <li
            key={index}
            className={`
              absolute w-auto h-full 
              transition-opacity duration-300 ease-in-out
              ${currentIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            <img
              className="object-cover w-full h-full"
              src={URL.createObjectURL(item.image)}
              alt={item.image.name}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </>
  )
}