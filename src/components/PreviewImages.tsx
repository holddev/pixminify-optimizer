import { useNavigate } from "react-router-dom";
import { Image, ImageID } from "../types/types";
import { PreviewImageItem } from "./PreviewImagesItem";
import { useState } from "react";
import { ArrowRigth, Download } from "./Icons";
import JSZip from "jszip";

interface Props {
  images: Image[]
  handleOnDelete: (id: ImageID) => void
}

export const PreviewImagesList: React.FC<Props> = ({ images, handleOnDelete }) => {

  const [imagesCompressed, setImagesCompresed] = useState<Image[]>([])


  const handleUpdateImages = async (file: Image) => {
    setImagesCompresed((prev) => {
      return prev.some(({ id }) => id === file.id)
        ? prev.map((img) => img.id === file.id ? file : img) // reemplaza
        : [...prev, file] // crea uno nuevo
    })
  }

  const handleDeleteImage = ({ id }: ImageID) => {
    handleOnDelete({ id: id })
    setImagesCompresed(prev => prev.filter((img) => img.id !== id))
  }

  const handleDowmloadAllImages = async () => {
    const zip = new JSZip()
    imagesCompressed.forEach((image) => {
      zip.file(image.image.name, image.image);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });

    const zipUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = zipUrl;
    a.download = "images.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipUrl);
  }

  const navigate = useNavigate()

  const handleGoOptimize = () => {
    navigate('/optimize', { state: images })
  }

  return (
    <>
      <section className="h-[500px] py-4 bg-[#fefefe] dark:bg-black/90 mt-16 
        flex flex-col items-center justify-start gap-6 text-black overflow-hidden transition duration-300
        rounded-lg shadow-primary shadow-sm px-10 group hover:-translate-y-2"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={handleDowmloadAllImages}
            className="flex items-center justify-between gap-2 px-4 py-2
            border-2 border-solid border-primary rounded-md
          text-primary bg-black/80 hover:bg-primary hover:border-transparent 
          hover:text-black dark:hover:text-black dark:hover:bg-primary dark:bg-transparent"
          >
            <Download class="size-5" />Descargar en zip
          </button>
        </div>
        <ul className="flex flex-col gap-2 w-full text-light-text_primary dark:text-dark-text_primary overflow-y-auto">
          {images.map((image) => {
            return (
              <PreviewImageItem
                item={image}
                key={image.id}
                onDelete={handleDeleteImage}
                onUpdateImages={handleUpdateImages}
              />
            )
          })}
        </ul>
        <button
          className="flex items-center justify-between gap-2 px-4 py-2
            border-2 border-solid border-primary rounded-full
          text-primary hover:bg-primary hover:border-transparent bg-black/80  
          hover:text-black dark:hover:bg-primary dark:hover:text-black dark:bg-transparent"
          onClick={handleGoOptimize}
        >
          Continuar
          <ArrowRigth class="size-5" />
        </button>

      </section>
    </>
  )
}