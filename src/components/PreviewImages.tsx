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
      <section className="h-[500px] py-4  bg-[#b5ff9031] my-8 
        flex flex-col items-center justify-start gap-y-6 text-black overflow-hidden"
      >
        <ul className="flex flex-col gap-2 w-4/5 text-white overflow-y-auto">
          {images.map((image) => {
            return (
              <PreviewImageItem item={image} key={image.id} onDelete={handleOnDelete} />
            )
          })}
        </ul>
        <button className="flex items-center justify-between gap-2 bg-blue-400 rounded-full px-4 py-2" onClick={handleGoOptimize}>Continuar</button>

      </section>
    </>
  )
}