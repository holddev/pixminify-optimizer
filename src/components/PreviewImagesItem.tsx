import { useEffect, useState } from "react"
import { Image, ImageID } from "../types/types"
import { formatFiles, formatFileSize } from "../utils/utils"
import { ChevronDown, Download, Trash } from "./Icons"
import { BounceLoader } from "react-spinners"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { compressImage } from "../lib/ImageCompression"

interface Props {
  item: Image
  onDelete: (id: ImageID) => void
  onUpdateImages: (image: Image) => void
}

export const PreviewImageItem: React.FC<Props> = ({ item, onDelete, onUpdateImages }) => {

  const { name, size, type } = item.image
  const initialFormat = formatFiles.find(({ value }) => value === type) || formatFiles[0];
  const [isLoading, setIsLoading] = useState(false)
  const [imageOptimized, setImageOptimized] = useState<Image | null>(null)
  const [imageFormat, setImageFormat] = useState(initialFormat)

  useEffect(() => {
    const compressImageAsync = async () => {
      setIsLoading(true);
      const imageCompressed = await compressImage({ imageFile: item.image, fileType: imageFormat.value });
      if (!imageCompressed) return

      const newExtension = imageFormat.value.split('/')[1]
      const lastDotIndex = name.lastIndexOf(".");
      const baseName = lastDotIndex !== -1 ? name.substring(0, lastDotIndex) : name;

      const renamedFileImage = new File(
        [imageCompressed],
        `${baseName}.${newExtension}`,
        { type: imageCompressed.type }
      );

      const currentImage = {
        id: item.id,
        image: renamedFileImage
      }

      onUpdateImages(currentImage)
      setImageOptimized(currentImage)
      setIsLoading(false);
    };
    compressImageAsync()
  }, [imageFormat])

  const handleOnDownload = () => {
    if (!imageOptimized) return;

    const url = URL.createObjectURL(imageOptimized.image);

    const link = document.createElement("a");
    link.href = url;
    link.download = imageOptimized.image.name || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const percentageOptimized = imageOptimized?.image.size && (
    ((size - imageOptimized.image.size) / size) * 100
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
                  color={'#005520'}
                />
              }
            </div>
          </div>
          <span className="text-start">{name.slice(0, 7)}...</span>
          <Listbox value={imageFormat} onChange={setImageFormat}>
            <ListboxButton
              className='relative block w-fit py-1 pl-3 pr-5 text-left text-sm/6  
                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                text-primary
                border-2 border-solid border-primary rounded-full dark:bg-white/30 bg-black/70
                '
            >
              {imageFormat.name}
              <ChevronDown
                class="group pointer-events-none absolute top-2.5 right-[2px] size-4"
                aria-hidden="true"
              />
            </ListboxButton>
            <ListboxOptions
              anchor="bottom"
              transition
              className={'w-fit rounded-xl border border-white/5 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-black/90 text-dark-text_primary'}
            >
              {formatFiles.map((option, index) => (
                <ListboxOption
                  key={index}
                  value={option}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1 px-3 select-none data-[focus]:bg-primary/50"
                >
                  <div className="text-sm/6">{option.name}</div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </div>

        <div className="flex items-center justify-end gap-6">
          <div className="flex gap-3">
            <span
              className="relative dark:text-dark-text_primary/60 text-light-text_primary/60"
            >
              {formatFileSize(size)}
              <div className="absolute top-1/2  w-full h-[1px] shadow-md rounded-full z-10 bg-red-600" />
            </span>
            <span className="font-semibold">{imageOptimized?.image.size && formatFileSize(imageOptimized?.image.size)}</span>
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