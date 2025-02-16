import { useEffect, useState } from "react"
import { Image, ImageID } from "../types/types"
import { formatFileSize } from "../utils/utils"
import { Download, Trash } from "./Icons"
import { BounceLoader } from "react-spinners"

interface Props {
  item: Image
  onDelete: (id: ImageID) => void
  onCompressImage: (image: Image) => Promise<File | undefined>
}

export const PreviewImageItem: React.FC<Props> = ({ item, onDelete, onCompressImage }) => {
  const { name, size, type } = item.image
  const [isLoading, setIsLoading] = useState(false)
  const [imageOptimized, setImageOptimized] = useState<File | null>(null)

  useEffect(() => {
    const compressImageAsync = async () => {
      setIsLoading(true);
      const imageCompressed = await onCompressImage(item);
      setImageOptimized(imageCompressed ?? item.image)
      setIsLoading(false);
    };
    compressImageAsync()
  }, [])

  const handleOnDownload = () => {
    if (!imageOptimized) return;

    const url = URL.createObjectURL(imageOptimized);

    const link = document.createElement("a");
    link.href = url;
    link.download = imageOptimized.name || "compressed-image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const percentageOptimized = imageOptimized?.size && (
    ((size - imageOptimized.size) / size) * 100
  )

  return (
    <>
      <li className=" rounded-md border-b-[1px] py-1 px-2 border-solid flex items-center justify-between hover:bg-primary/40">
        <div className="flex items-center justify-start gap-x-4">
          <div className="relative size-16">
            <img className="w-full h-full object-cover object-center" src={URL.createObjectURL(item.image)} alt={name} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-10">
              {
                isLoading && <BounceLoader
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  color={'#4bff0a'}
                />
              }
            </div>
          </div>
          <span className="text-start">{name.slice(0, 7)}...</span>
          <span
            className="text-sm py-1 px-2 rounded-full border-2 border-solid border-primary
            dark:bg-white/30 bg-black/70 text-primary uppercase">
            {type.split("/")[1]}
          </span>
        </div>

        <div className="flex items-center justify-end gap-6">
          <div className="flex gap-3">
            <span
              className="relative dark:text-dark-text_primary/60 text-light-text_primary/60"
            >
              {formatFileSize(size)}
              <div className="absolute top-1/2  w-full h-[1px] shadow-md rounded-full z-10 bg-red-600" />
            </span>
            <span className="font-semibold">{imageOptimized?.size && formatFileSize(imageOptimized?.size)}</span>
          </div>

          <span
            className="text-sm py-1 px-2 rounded-full border-2 border-solid border-primary
            dark:bg-white/30 bg-black/70 text-primary">
            {(percentageOptimized)?.toFixed(2)}%
          </span>

          <div className="flex gap-2 pr-4">
            <button
              onClick={handleOnDownload}
              title="descargar"
              aria-label="descargar imagen"
            >
              <Download class="size-5 hover:text-blue-400 transition-colors duration-100" />
            </button>
            <button
              title="eliminar"
              aria-label="eliminar imagen"
              onClick={() => { onDelete({ id: item.id }) }}
            >
              <Trash class="size-5 hover:text-red-400 transition-colors duration-100" />
            </button>
          </div>
        </div>
      </li >
    </>
  )
}