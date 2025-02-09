import { useNavigate } from "react-router-dom";
import { Image, ImageID } from "../types/types";
import { PreviewImageItem } from "./PreviewImagesItem";

interface Props {
  images: Image[]
  handleOnDelete: (id: ImageID) => void
}

export const PreviewImagesList: React.FC<Props> = ({ images, handleOnDelete }) => {

  const navigate = useNavigate()

  const handleGoOptimize = () => {
    navigate('/optimize', { state: images })
  }

  return (
    <>
      <section className="h-[500px] py-4  dark:bg-dark-primary_variant1 mt-8 
        flex flex-col items-center justify-start gap-6 text-black overflow-hidden transition-shadow duration-300
        rounded-lg shadow-primary shadow-sm"
      >
        <ul className="flex flex-col gap-2 w-4/5 text-light-text_primary dark:text-dark-text_primary overflow-y-auto">
          {images.map((image) => {
            return (
              <PreviewImageItem item={image} key={image.id} onDelete={handleOnDelete} />
            )
          })}
        </ul>
        <button
          className="flex items-center justify-between gap-2 px-4 py-2
          border-2 border-solid border-primary rounded-full
          text-primary hover:bg-primary hover:border-transparent 
          dark:hover:text-dark-text_primary hover:text-light-text_primary"
          onClick={handleGoOptimize}
        >
          Continuar
        </button>
      </section>
    </>
  )
}