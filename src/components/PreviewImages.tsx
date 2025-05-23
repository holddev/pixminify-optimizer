import { Link } from "react-router-dom";
import { Image, ImageID } from "../types/types";
import { PreviewImageItem } from "./PreviewImagesItem";
import { useEffect, useState } from "react";
import { ArrowRigth, Download } from "./Icons";
import JSZip from "jszip";

interface Props {
  images: Image[]
  handleOnDelete: (id: ImageID) => void
}

export const PreviewImagesList: React.FC<Props> = ({ images, handleOnDelete }) => {

  const [imagesCompressed, setImagesCompresed] = useState<Image[]>(images || [])

  const handleUpdateImages = async (updatedImage: Image) => {
    setImagesCompresed(prevImages =>
      prevImages.map(img =>
        img.id === updatedImage.id ? updatedImage : img
      )
    )
  }

  const handleDeleteImage = ({ id }: ImageID) => {
    handleOnDelete({ id: id })
    setImagesCompresed(prev => prev.filter((img) => img.id !== id))
  }

  const handleDownloadAllImages = async () => {
    const zip = new JSZip()
    imagesCompressed.forEach((image) => {
      if (!image.compressedImage) return
      zip.file(image.compressedImage.name, image.compressedImage);
    });
    const zipBlob = await zip.generateAsync({ type: "blob" });

    const zipUrl = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = zipUrl;
    a.download = "images-pixminify.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipUrl);
  }

  useEffect(() => {
    setImagesCompresed(images)
  }, [images])

  return (
    <>
      <section className="h-[500px] py-4 bg-[#fefefe] dark:bg-black/90 mt-16 
        flex flex-col items-center justify-start gap-6 text-black overflow-hidden transition duration-300
        rounded-lg shadow-primary shadow-sm px-2 md:px-10 group hover:-translate-y-2"
      >
        <div className="w-full flex justify-end">
          <button
            onClick={handleDownloadAllImages}
            className="flex items-center justify-between gap-2 px-4 py-2
            border-2 border-solid border-primary rounded-md
          text-primary bg-black/80 hover:bg-primary hover:border-transparent 
          hover:text-black dark:hover:text-black dark:hover:bg-primary dark:bg-transparent"
          >
            <Download class="size-5" />Descargar en zip
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <ul className="flex flex-col gap-2 w-full min-w-[600px]  text-light-text_primary dark:text-dark-text_primary overflow-y-auto">
            {imagesCompressed.map((image) => {
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
        </div>

        <Link
          to='/optimize'
          className="flex items-center justify-between gap-2 px-4 py-2
            border-2 border-solid border-primary rounded-full
          text-primary hover:bg-primary hover:border-transparent bg-black/80  
          hover:text-black dark:hover:bg-primary dark:hover:text-black dark:bg-transparent"
          state={imagesCompressed}
        >
          Continuar
          <ArrowRigth class="size-5" />
        </Link>
      </section>
    </>
  )
}