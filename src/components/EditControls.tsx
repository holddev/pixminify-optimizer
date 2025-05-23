import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react"
import { formatFiles } from "../utils/utils"
import { ChevronDown, Download } from "./Icons"
import { useEffect, useState } from "react"
import { CompressionSettings, Image } from "../types/types"

interface Props {
  className?: string
  onApply: (settings: CompressionSettings) => void
  image?: Image
}
export const EditControls: React.FC<Props> = ({ className, onApply, image }) => {
  const [imageFormat, setImageFormat] = useState(image?.settings?.format || formatFiles[0].value)
  const [preserveExif, setPreserveExif] = useState(image?.settings?.saveMetadata);


  useEffect(() => {
    setImageFormat(image?.settings?.format || formatFiles[0].value)
    setPreserveExif(image?.settings?.saveMetadata);
  }, [image])

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApply({ format: imageFormat, saveMetadata: preserveExif })
    console.log({
      imageFormat,
      preserveExif
    })
  }

  const handleDownloadImage = () => {
    if (!image?.compressedImage) return

    const a = document.createElement("a");
    a.href = URL.createObjectURL(image?.compressedImage);
    a.download = image.compressedImage.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <aside className={`absolute z-10 h-[200px] w-[250px] right-4 bottom-[0] -translate-y-[100px]
    rounded-md px-2 py-2 bg-black/90 text-[#d2d2d2] ${className}`}>
      <h4 className="text-lg font-bold uppercase text-center">Panel de <span className="text-primary/90">edición</span></h4>
      <hr className="w-full my-2 h-[1.3px] bg-gradient-to-r from-primary/30 via-primary/70 to-primary/30 rounded-sm" />
      <form onSubmit={handleOnSubmit}>
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={preserveExif}
            onChange={(e) => setPreserveExif(e.target.checked)}
            className="size-4 transition-all duration-200"
          />
          <span>Conservar metadatos EXIF</span>
        </label>

        <div className="flex flex-col gap-2">
          <label >Formato de salida</label>
          <div>
            <Listbox
              value={imageFormat}
              onChange={setImageFormat}
            >
              <ListboxButton
                className='relative block w-[100px] py-1 pl-3 pr-5 text-left text-sm/6  
                focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                text-primary
                border-2 border-solid border-primary rounded-full dark:bg-white/30 bg-black/80
                '
              >
                {
                  formatFiles.find(f => f.value === imageFormat)?.name
                }
                <ChevronDown
                  class="group pointer-events-none absolute top-2.5 right-[2px] size-4"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                transition
                className={'z-20 w-[100px] rounded-xl border border-white/5 [--anchor-gap:var(--spacing-1)] focus:outline-none transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 bg-black/90 text-dark-text_primary'}
              >
                {formatFiles.map((option, index) => (
                  <ListboxOption
                    key={index}
                    value={option.value}
                    className="group flex cursor-default items-center gap-2 rounded-lg py-1 px-3 select-none data-[focus]:bg-primary/50"
                  >
                    <div className="text-sm/6">{option.name}</div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>

        <div className="w-full flex gap-1 mt-2">
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-lg bg-primary/80 text-black font-semibold text-sm shadow-md hover:bg-primary/90 transition-all duration-300 active:scale-[0.98] cursor-pointer"
          >
            Aplicar
          </button>
          <button
            onClick={handleDownloadImage}
            type="button"
            title="Descargar imagen"
            className={`rounded-lg bg-primary/80 text-black hover:bg-primary/90 transition-all duration-300 active:scale-[0.98] cursor-pointer
            ${!image?.compressedImage && 'opacity-50 cursor-not-allowed pointer-events-none'}
            `}
          >
            <Download class="size-5 m-2 pointer-events-none" />
          </button>
        </div>

      </form>
    </aside>
  )
}