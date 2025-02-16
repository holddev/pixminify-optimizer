import { useNavigate } from "react-router-dom";
import { Image, ImageID } from "../types/types";
import { PreviewImageItem } from "./PreviewImagesItem";
import { useState } from "react";
import { Download } from "./Icons";
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
      <section className="h-[500px] py-4  dark:bg-dark-primary_variant1 mt-8 
        flex flex-col items-center justify-start gap-6 text-black overflow-hidden transition-shadow duration-300
        rounded-lg shadow-primary shadow-sm px-10"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={handleDowmloadAllImages}
            className="flex items-center gap-2
            py-2 px-4 rounded-md border-2 border-solid 
            bg-black/60 text-primary border-primary hover:bg-primary/70 
            dark:hover:text-dark-text_primary hover:text-light-text_primary 
            dark:hover:border-dark-text_primary hover:border-light-text_primary"
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